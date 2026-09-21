import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { tapResponse } from "@ngrx/operators";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { exhaustMap, forkJoin, pipe, switchMap, tap } from "rxjs";
import { LoanApplication } from "../types/models/loan-application";
import { LoanApplicationService } from "../services/loan-application.service";
import { CreateLoanApplicationRequest } from "../types/models/create-loan-application-request";
import { LoanStatistics } from "../types/models/loan-statistics";

type LoanApplicationCollectionState = {
    loanApplications: LoanApplication[];
    statistics: LoanStatistics;
    isLoading: boolean;
    selectedLoanId: number | null;
};

const initialState: LoanApplicationCollectionState = {
    loanApplications: [],
    statistics: {
        totalApplications: 0,
        approvalRate: 0,
        averageLoanAmountApproved: 0,
        totalLoanAmountApproved: 0
    },
    isLoading: false,
    selectedLoanId: null
};

export const LoanApplicationStore = signalStore(
    withState(initialState),
    withComputed(({ loanApplications, selectedLoanId }) => ({
        selectedLoanApplication: computed(() =>
            loanApplications().find(application => application.id === selectedLoanId()) ?? null
        )
    })),
    withMethods((store, service = inject(LoanApplicationService)) => ({
        loadApplications: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { isLoading: true })),
                switchMap(() =>
                    service.getAll().pipe(
                        tapResponse({
                            next: loanApplications => patchState(store, currentState => ({
                                loanApplications,
                                selectedLoanId: loanApplications.some(application => application.id === currentState.selectedLoanId)
                                    ? currentState.selectedLoanId
                                    : loanApplications[0]?.id ?? null
                            })),
                            error: () => { patchState(store, { loanApplications: service.getPlaceholderLoanApplications() }) },
                            finalize: () => patchState(store, { isLoading: false })
                        })
                    )
                )
            )
        ),
        createApplication: rxMethod<CreateLoanApplicationRequest>(
            pipe(
                exhaustMap(request => service.create(request).pipe(
                    switchMap(() => forkJoin({
                        loanApplications: service.getAll(),
                        statistics: service.getStatistics()
                    })),
                    tapResponse({
                        next: ({ loanApplications, statistics }) => patchState(store, { loanApplications, statistics }),
                        error: () => { }
                    })
                ))
            )
        ),
        assessApplication: rxMethod<number>(
            pipe(
                exhaustMap(loanId => service.assessLoanApplication(loanId).pipe(
                    switchMap(() => forkJoin({
                        loanApplications: service.getAll(),
                        statistics: service.getStatistics()
                    })),
                    tapResponse({
                        next: ({ loanApplications, statistics }) => patchState(store, { loanApplications, statistics }),
                        error: () => { }
                    })
                ))
            )
        ),
        selectLoan(loanId: number): void {
            patchState(store, { selectedLoanId: loanId });
        },
        loadStatistics: rxMethod<void>(
            pipe(
                switchMap(() => service.getStatistics()),
                tapResponse({
                    next: statistics => patchState(store, { statistics }),
                    error: () => { }
                })
            )
        )
    }))
);
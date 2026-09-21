using LoanApp.Application.Contracts.Services;
using Microsoft.AspNetCore.Mvc;

namespace LoanApp.API.Controllers;

[Route("api/loans/{loanId}/schedule")]
[ApiController]
public class RepaymentsController(ILoanRepaymentService LoanRepaymentService) : ControllerBase
{
    [HttpGet("outstanding")]
    public async Task<IActionResult> GetOutstandingInstallments([FromRoute] int loanId)
    {
        var outstandingInstallments = await LoanRepaymentService.GetAllUnpaidRepaymentInstallments(loanId);
        return Ok(outstandingInstallments);
    }

    [HttpGet()]
    public async Task<IActionResult> GetLoanRepaymentSchedule([FromRoute] int loanId)
    {
        var loanRepaymentSchedule = await LoanRepaymentService.GetRepaymentSchedule(loanId);
        return Ok(loanRepaymentSchedule);
    }

    [HttpPut("entries/{entryId}/pay")]
    public async Task<IActionResult> PayLoanRepaymentInstallment([FromRoute] int loanId, [FromRoute] int entryId)
    {
        await LoanRepaymentService.PayRepaymentInstallment(loanId, entryId);
        return NoContent();
    }
}

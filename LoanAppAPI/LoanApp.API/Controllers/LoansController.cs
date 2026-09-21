using LoanApp.Application.Contracts.Services;
using LoanApp.Application.DTOs.Request;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace LoanApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoansController(
    ILoanApplicationService LoanApplicationService,
    ILoanAssessmentService LoanAssessmentService
) : ControllerBase
{
    [HttpGet()]
    public async Task<IActionResult> GetAllLoanApplications()
    {
        var loanApplications = await LoanApplicationService.GetLoanApplications();
        return Ok(loanApplications);
    }

    [HttpGet("applicant/{email}")]
    public async Task<IActionResult> GetLoanApplicationsByEmail(string email)
    {

        var loanApplicationsByEmail = await LoanApplicationService.GetLoanApplicationsByApplicantEmail(email);
        return Ok(loanApplicationsByEmail);
    }

    [HttpGet("{loanId}")]
    public async Task<IActionResult> GetLoanApplication([FromRoute] int loanId)
    {
        var loanApplication = await LoanApplicationService.GetLoanApplicationById(loanId);
        return Ok(loanApplication);
    }

    [HttpPost()]
    public async Task<IActionResult> SubmitLoanApplication([FromBody] CreateLoanApplicationRequest loanApplicationRequestData)
    {
        var loanApplication = await LoanApplicationService.CreateLoanApplication(loanApplicationRequestData);
        return CreatedAtAction(
            nameof(GetLoanApplication),
            new { loanId = loanApplication.Id },
            loanApplication
        );
    }

    [HttpPost("{loanId}/assess")]
    public async Task<IActionResult> AssessLoanApplication([FromRoute] int loanId)
    {

        var assessmentResponse = await LoanAssessmentService.AssessLoanApplication(loanId);
        return Ok(assessmentResponse);
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetLoanStatistics()
    {

        var loanStats = await LoanApplicationService.GetLoanApplicationStatistics();
        return Ok(loanStats);
    }
}

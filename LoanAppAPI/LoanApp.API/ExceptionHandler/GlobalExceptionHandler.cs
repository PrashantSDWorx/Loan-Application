using LoanApp.Domain.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace LoanApp.API.ExceptionHandler;

public class GlobalExceptionHandler(
    IProblemDetailsService problemDetailsService ) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext context, Exception exception, CancellationToken cancellation)
    {
            context.Response.StatusCode = exception switch
            {
                LoanNotFoundException => StatusCodes.Status404NotFound,
                RepaymentScheduleNotFoundException => StatusCodes.Status404NotFound,
                LoanAlreadyAssessedException => StatusCodes.Status409Conflict,
                _ => StatusCodes.Status500InternalServerError
            };

            return await problemDetailsService.TryWriteAsync(new ProblemDetailsContext
            { 
                HttpContext = context,
                Exception = exception,
                ProblemDetails = new ProblemDetails
                {
                    Title = "An error occured",
                    Type = exception.GetType().Name,
                    Detail = exception.Message
                }
            });
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Http.Results;
namespace WebApi.Controllers
{
    public class DefaultController : ApiController
    {
        [HttpGet]
        [Route("")]
        public HttpResponseMessage GetMainPage()
        {
            var response = new HttpResponseMessage();
            var mainPageContents = File.ReadAllText(HostingEnvironment.MapPath("~/dist/index.html"));
            response.Content = new StringContent(mainPageContents);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html");
            
            return response;
        }

    }
}

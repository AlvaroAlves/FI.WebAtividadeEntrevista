using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;
using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        // GET: Beneficiario
        public ActionResult Index()
        {
            return View("Index");
        }

        public ActionResult Incluir()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Delete(long Id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            bo.Excluir(Id);
            return Json("Cadastro removido com sucesso");
        }

        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (bo.VerificarExistencia(model.CPF, model.IdCliente))
                return Json(string.Join(Environment.NewLine, "CPF já está cadastrado para este cliente"));

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {

                model.Id = bo.Incluir(new Beneficiario()
                {
                    Nome = model.Nome,
                    IdCliente = model.IdCliente,
                    CPF = model.CPF.Replace(".", "").Replace("-", "")
                });

                return Json("Cadastro efetuado com sucesso");
            }
        }

        [HttpPost]
        public JsonResult Alterar(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                bo.Alterar(new Beneficiario()
                {
                    Id = model.Id,
                    Nome = model.Nome,
                    IdCliente = model.IdCliente,
                    CPF = model.CPF.Replace(".", "").Replace("-", "")
                });

                return Json("Cadastro alterado com sucesso");
            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            Beneficiario beneficiario = bo.Consultar(id);
            Models.BeneficiarioModel model = null;

            if (beneficiario != null)
            {
                model = new BeneficiarioModel()
                {
                    Id = model.Id,
                    Nome = model.Nome,
                    IdCliente = model.IdCliente,
                    CPF = model.CPF.Replace(".", "").Replace("-", "")
                };
            }

            return View(model);
        }

        [HttpPost]
        public JsonResult BeneficiarioList(BeneficiarioModel model)
        {
            try
            {
                List<Beneficiario> beneficiarios = new BoBeneficiario().Listar(model.IdCliente);
                return Json(beneficiarios);
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    
    }
}
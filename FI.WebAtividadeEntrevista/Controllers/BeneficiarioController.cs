using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;
using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
        public ActionResult Alterar(string list, string idCliente)
        {
            List<Beneficiario> registrosAlterados = new List<Beneficiario>();
            List<Beneficiario> beneficiarios = new BoBeneficiario().Listar(long.Parse(idCliente));


            JArray array = JArray.Parse(list);
            foreach (JObject obj in array.Children<JObject>())
            {
                BeneficiarioModel model = new BeneficiarioModel();
                
                foreach (JProperty singleProp in obj.Properties())
                {
                    string name = singleProp.Name;
                    
                    switch (name)
                    {
                        case "id":
                            model.Id = singleProp.Value.ToString() == "" ? 0 : long.Parse(singleProp.Value.ToString());
                            break;
                        case "cpf":
                            model.CPF = singleProp.Value.ToString();
                            break;
                        case "nome":
                            model.Nome = singleProp.Value.ToString();
                            break;
                    }

                    
                }
                model.IdCliente = long.Parse(idCliente);
                
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
                    if (model.Id != 0)
                    {
                        bo.Alterar(new Beneficiario()
                        {
                            Id = model.Id,
                            Nome = model.Nome,
                            IdCliente = model.IdCliente,
                            CPF = model.CPF.Replace(".", "").Replace("-", "")
                        });
                    }
                    else
                    {
                        model.Id = bo.Incluir(new Beneficiario()
                        {
                            Nome = model.Nome,
                            IdCliente = model.IdCliente,
                            CPF = model.CPF.Replace(".", "").Replace("-", "")
                        });
                    }

                    registrosAlterados.Add( new Beneficiario()
                    {
                        Id = model.Id,
                        Nome = model.Nome,
                        IdCliente = model.IdCliente,
                        CPF = model.CPF.Replace(".", "").Replace("-", "")
                    });
                }
            }

            var Excluidos = beneficiarios.Where(x => !registrosAlterados.Any(z => z.Id == x.Id)).ToList();

            foreach(Beneficiario excluido in Excluidos)
            {
                BoBeneficiario bo = new BoBeneficiario();
                bo.Excluir(excluido.Id);
            }

            return Json("Cadastro alterado com sucesso");
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
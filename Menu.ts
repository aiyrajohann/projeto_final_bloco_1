import readlinesync = require("readline-sync");
import { colors } from "./src/util/Colors";
import { BrokerController } from "./src/controller/BrokerController";
import { PropertyController } from "./src/controller/PropertyController";

const brokerController = new BrokerController();
const propertyController = new PropertyController(brokerController);

export function main(): void {
  let opcao: number;

  while (true) {
    console.log(colors.bg.red, colors.fg.whitestrong);
    console.log("*****************************************************");
    console.log("                                                     ");
    console.log("          IMOBILIÁRIA - PROJETO FINAL                ");
    console.log("                                                     ");
    console.log("*****************************************************");
    console.log("                                                     ");
    console.log("         1 - Cadastrar corretor                      ");
    console.log("         2 - Listar corretores                       ");
    console.log("         3 - Cadastrar imóvel                        ");
    console.log("         4 - Listar imóveis                          ");
    console.log("         5 - Buscar imóvel por ID                    ");
    console.log("         6 - Atualizar corretor                      ");
    console.log("         7 - Deletar imóvel                          ");
    console.log("         8 - Relatório de comissões                  ");
    console.log("         0 - Sair                                    ");
    console.log("                                                     ");
    console.log("*****************************************************");
    console.log("                                                     ");
    console.log(colors.reset);

    console.log("Entre com a opção desejada: ");
    opcao = readlinesync.questionInt("");

    if (opcao === 0) {
      console.log(colors.fg.greenstrong, "\nImobiliária - Obrigado e até logo!");
      sobre();
      console.log(colors.reset, "");
      process.exit(0);
    }

    switch (opcao) {
      case 1:
        cadastrarCorretor();
        break;

      case 2:
        listarCorretores();
        break;

      case 3:
        cadastrarImovel();
        break;

      case 4:
        listarImoveis();
        break;

      case 5:
        buscarImovelPorId();
        break;

      case 6:
        atualizarCorretor();
        break;

      case 7:
        deletarImovel();
        break;

      case 8:
        relatorioComissoes();
        break;

      default:
        console.log(colors.fg.red, "\nOpção Inválida!", colors.reset);
        keyPress();
        break;
    }
  }
}

function cadastrarCorretor(): void {
  console.log(colors.fg.whitestrong, "\n\nCadastrar Corretor\n\n", colors.reset);

  try {
    const nome = readlinesync.question("Digite o nome do corretor: ");
    const email = readlinesync.question("Digite o email do corretor: ");

    const broker = brokerController.cadastrar(nome, email);

    console.log(colors.fg.greenstrong, `\nCorretor cadastrado com sucesso! ID: ${broker.id}`, colors.reset);
    broker.visualizar();
  } catch (error: any) {
    console.log(colors.fg.red, `\nErro: ${error.message}`, colors.reset);
  }

  keyPress();
}

function listarCorretores(): void {
  console.log(colors.fg.whitestrong, "\n\nListar Todos os Corretores\n\n", colors.reset);

  try {
    const brokers = brokerController.listarTodos();

    console.log(colors.fg.cyan, `\nTotal de corretores: ${brokers.length}\n`, colors.reset);
    brokers.forEach(broker => {
      broker.visualizar();
      console.log("-----------------------------------");
    });
  } catch (error: any) {
    console.log(colors.fg.red, `\nErro: ${error.message}`, colors.reset);
  }

  keyPress();
}

function atualizarCorretor(): void {
  console.log(colors.fg.whitestrong, "\n\nAtualizar Corretor\n\n", colors.reset);

  try {
    const id = readlinesync.questionInt("Digite o ID do corretor: ");

    // Mostra dados atuais
    const brokerAtual = brokerController.buscarPorId(id);
    console.log(colors.fg.cyan, "\nDados atuais:", colors.reset);
    brokerAtual.visualizar();

    // Solicita novos dados
    const nome = readlinesync.question("\nDigite o novo nome: ");
    const email = readlinesync.question("Digite o novo email: ");

    const broker = brokerController.atualizar(id, nome, email);

    console.log(colors.fg.greenstrong, "\nCorretor atualizado com sucesso!", colors.reset);
    broker.visualizar();
  } catch (error: any) {
    console.log(colors.fg.red, `\nErro: ${error.message}`, colors.reset);
  }

  keyPress();
}


function cadastrarImovel(): void {
  console.log(colors.fg.whitestrong, "\n\nCadastrar Imóvel\n\n", colors.reset);

  try {
    const descricao = readlinesync.question("Digite a descricao do imovel: ");
    const preco = readlinesync.questionFloat("Digite o preco do imovel: ");
    const corretorId = readlinesync.questionInt("Digite o ID do corretor responsavel: ");

    const property = propertyController.cadastrar(descricao, preco, corretorId);

    console.log(colors.fg.greenstrong, `\nImovel cadastrado com sucesso! ID: ${property.id}`, colors.reset);
    property.visualizar();
  } catch (error: any) {
    console.log(colors.fg.red, `\nErro: ${error.message}`, colors.reset);
  }

  keyPress();
}

function listarImoveis(): void {
  console.log(colors.fg.whitestrong, "\n\nListar Todos os Imóveis\n\n", colors.reset);

  try {
    const properties = propertyController.listarTodos();

    console.log(colors.fg.cyan, `\nTotal de imóveis: ${properties.length}\n`, colors.reset);
    properties.forEach(property => {
      property.visualizar();
      console.log("-----------------------------------");
    });
  } catch (error: any) {
    console.log(colors.fg.red, `\nErro: ${error.message}`, colors.reset);
  }

  keyPress();
}

function buscarImovelPorId(): void {
  console.log(colors.fg.whitestrong, "\n\nBuscar Imóvel por ID\n\n", colors.reset);

  try {
    const id = readlinesync.questionInt("Digite o ID do imovel: ");
    const property = propertyController.buscarPorId(id);

    console.log(colors.fg.greenstrong, "\nImóvel encontrado:", colors.reset);
    property.visualizar();
  } catch (error: any) {
    console.log(colors.fg.red, `\nErro: ${error.message}`, colors.reset);
  }

  keyPress();
}

function deletarImovel(): void {
  console.log(colors.fg.whitestrong, "\n\nDeletar Imóvel\n\n", colors.reset);

  try {
    const id = readlinesync.questionInt("Digite o ID do imovel: ");

    const property = propertyController.buscarPorId(id);
    console.log(colors.fg.cyan, "\nImóvel a ser deletado:", colors.reset);
    property.visualizar();

    const confirmar = readlinesync.question("\nConfirma a exclusao? (S/N): ");

    if (confirmar.toUpperCase() === "S") {
      propertyController.deletar(id);
      console.log(colors.fg.greenstrong, "\nImóvel deletado com sucesso!", colors.reset);
    } else {
      console.log(colors.fg.yellow, "\nOperação cancelada.", colors.reset);
    }
  } catch (error: any) {
    console.log(colors.fg.red, `\nErro: ${error.message}`, colors.reset);
  }

  keyPress();
}


function relatorioComissoes(): void {
  console.log(colors.fg.whitestrong, "\n\nRelatório de Comissões\n\n", colors.reset);

  try {
    const brokers = brokerController.listarPorComissao();

    console.log(colors.fg.cyan, "Corretores ordenados por comissão (maior para menor):\n", colors.reset);
    brokers.forEach((broker, index) => {
      console.log(`${index + 1}º - ${broker.name}`);
      console.log(`    Comissão Total: R$ ${broker.totalCommission.toFixed(2)}`);
      console.log("-----------------------------------");
    });

    const totalComissoes = brokers.reduce((sum, b) => sum + b.totalCommission, 0);
    console.log(colors.fg.greenstrong, `\nTotal de comissões: R$ ${totalComissoes.toFixed(2)}`, colors.reset);
    console.log(colors.fg.greenstrong, `Total de corretores: ${brokers.length}`, colors.reset);
  } catch (error: any) {
    console.log(colors.fg.red, `\nErro: ${error.message}`, colors.reset);
  }

  keyPress();
}


function sobre(): void {
  console.log("\n*****************************************************");
  console.log("Projeto Desenvolvido por: Aiyra Johann");
  console.log("Email: aiyra.j.araujo@hotmail.com");
  console.log("github.com/aiyrajohann");
  console.log("*****************************************************");
}


function keyPress(): void {
  console.log(colors.reset, "");
  console.log("\nPressione enter para continuar...");
  readlinesync.prompt();
}

main();


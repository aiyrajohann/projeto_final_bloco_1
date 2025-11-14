import readlinesync = require("readline-sync");
import { colors } from "./src/util/Colors";

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
    console.log("         5 - Atribuir corretor a imóvel              ");
    console.log("         6 - Vender imóvel                           ");
    console.log("         7 - Relatório de comissões                  ");
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
        console.log(colors.fg.whitestrong, "\n\nCadastrar corretor\n\n", colors.reset);
        console.log(colors.fg.yellow, "Funcionalidade será implementada na branch Controller.", colors.reset);
        keyPress();
        break;

      case 2:
        console.log(colors.fg.whitestrong, "\n\nListar corretores\n\n", colors.reset);
        console.log(colors.fg.yellow, "Funcionalidade será implementada na branch Controller.", colors.reset);
        keyPress();
        break;

      case 3:
        console.log(colors.fg.whitestrong, "\n\nCadastrar imóvel\n\n", colors.reset);
        console.log(colors.fg.yellow, "Funcionalidade será implementada na branch Controller.", colors.reset);
        keyPress();
        break;

      case 4:
        console.log(colors.fg.whitestrong, "\n\nListar imóveis\n\n", colors.reset);
        console.log(colors.fg.yellow, "Funcionalidade será implementada na branch Controller.", colors.reset);
        keyPress();
        break;

      case 5:
        console.log(colors.fg.whitestrong, "\n\nAtribuir corretor a imóvel\n\n", colors.reset);
        console.log(colors.fg.yellow, "Funcionalidade será implementada na branch Controller.", colors.reset);
        keyPress();
        break;

      case 6:
        console.log(colors.fg.whitestrong, "\n\nVender imóvel\n\n", colors.reset);
        console.log(colors.fg.yellow, "Funcionalidade será implementada na branch Controller.", colors.reset);
        keyPress();
        break;

      case 7:
        console.log(colors.fg.whitestrong, "\n\nRelatório de comissões\n\n", colors.reset);
        console.log(colors.fg.yellow, "Funcionalidade será implementada na branch Controller.", colors.reset);
        keyPress();
        break;

      default:
        console.log(colors.fg.red, "\nOpção Inválida!", colors.reset);
        keyPress();
        break;
    }
  }
}

/* Função sobre */
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


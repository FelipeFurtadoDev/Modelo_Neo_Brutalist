/* ==========================================================
   CONFIGURAÇÃO DO WHATSAPP
   Deixe vazio ("") enquanto for demonstração.
   Para ativar: só números, com país e DDD. Ex. fictício: "5511999999999"
   ========================================================== */
const WHATSAPP_NUMBER = "";
const WHATSAPP_MESSAGE = "Olá! Encontrei seu site e gostaria de informações sobre orçamento ou agendamento.";

// Avisa o CSS que o JavaScript funcionou
document.documentElement.classList.add("js");

/* ---------- Menu móvel ---------- */
const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu-principal");

function abrirMenu(abrir) {
  menu.classList.toggle("aberto", abrir);
  botaoMenu.setAttribute("aria-expanded", String(abrir));
}
botaoMenu.addEventListener("click", () => abrirMenu(botaoMenu.getAttribute("aria-expanded") !== "true"));
menu.addEventListener("click", (e) => { if (e.target.closest("a")) abrirMenu(false); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && botaoMenu.getAttribute("aria-expanded") === "true") {
    abrirMenu(false);
    botaoMenu.focus();
  }
});

/* ---------- Revelar elementos ao rolar ---------- */
const itens = document.querySelectorAll("[data-reveal]");
const menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (menosMovimento || !("IntersectionObserver" in window)) {
  itens.forEach((el) => el.classList.add("on"));   // mostra tudo, sem animar
} else {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("on");
        observador.unobserve(entrada.target);       // anima só uma vez
      }
    });
  }, { threshold: 0.15 });
  itens.forEach((el) => observador.observe(el));
}

/* ---------- Botões de WhatsApp ---------- */
const numeroValido = /^\d{10,15}$/.test(WHATSAPP_NUMBER);
const aviso = document.getElementById("aviso");
let temporizador;

function mostrarAviso(texto) {
  aviso.textContent = texto;
  aviso.classList.add("visivel");
  clearTimeout(temporizador);
  temporizador = setTimeout(() => aviso.classList.remove("visivel"), 8000);
}

document.querySelectorAll("[data-whatsapp]").forEach((botao) => {
  if (numeroValido) {
    botao.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);
    botao.target = "_blank";
    botao.rel = "noopener noreferrer";
  } else {
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarAviso("Contato demonstrativo: nenhum número foi configurado. Em um site real, este botão abriria o WhatsApp da empresa.");
    });
  }
});
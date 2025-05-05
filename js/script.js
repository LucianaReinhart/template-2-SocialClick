let data; // la declaras en ámbito superior

async function loadData() {
  try {
    const response = await fetch("js/data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json(); // asignas el JSON a tu variable
    console.log("Datos cargados:", data);
  } catch (err) {
    console.error("Error al cargar JSON:", err);
  }
}

function loadMain(main_class){
  if(main_class.length>0){
    let main = document.getElementById("main");
    main.className = main_class;
  }
}

function loadContentClass(content_class){
  if(content_class.length>0){
    let content = document.getElementById("content");
    content.className = content_class;
  }
}

function loadContentStyle(content_style){
  if(content_style.length>0){
    let content = document.getElementById("content");
    content.style.cssText = content_style;
  }
}

function loadHeader(header_json){
  if(!(Object.keys(header_json).length === 0)){
    let header = document.getElementById("header");
    header.className = header_json.class;
    if(!(Object.keys(header_json.content_img).length === 0)){
      header.innerHTML = `
      <div class="${(header_json.content_img.class === "") ? '' : header_json.content_img.class}" style="${(header_json.content_img.style === "") ? '' : header_json.content_img.style}">
        <img src="${header_json.content_img.img}" alt="" >
      </div>
      `;
    }
  }
}

function loadName(name) {
  if (!(Object.keys(name).length === 0)) {
    let label_name = document.getElementById("label_name");
    label_name.style.cssText = name.label_style;
    if(name.label_class.length>0){
      label_name.className = name.label_class;
    }
    label_name.innerHTML = `
      <h3 class="${name.class}" style="${name.style}">${name.title}</h3>  
    `;
  }
}

function buildBorder(width = "", style = "", color = "") {
  // Normalizar entradas
  const w = width.trim();
  const s = style.trim();
  const c = color.trim();

  // ⛔️ Si los tres parámetros vienen vacíos, no hacemos nada
  if (w === "" && s === "" && c === "") return "";

  // Valores por defecto
  const safeWidth  = w || "2px";
  const safeStyle  = s || "solid";
  const safeColor  = normalizeColor(c || "bg-mono-900");

  return `border: ${safeWidth} ${safeStyle} ${safeColor};`;
}

/* Convierte 'bg-mono-500' → 'var(--clr-mono-500)'  */
function normalizeColor(token) {
  if (token.startsWith("bg-")) {
    return `var(--clr${token.slice(2)})`;
  }
  return token; // ya es un color válido (#fff, rgb(), etc.)
}

function loadSocialIcon(content_icons) {
  if (!(Object.keys(content_icons).length === 0)) {
    let icons = "";
    if (!(Object.keys(content_icons.effec) === 0)) {
      icons = `
      <style>
      a:hover{
      ${
        content_icons.effec.bg_color != ""
          ? `background-color: var(${content_icons.effec.bg_color.replace(
              "bg",
              "--clr"
            )})`
          : ""
      };
      ${
        content_icons.effec.icon_color != ""
          ? `color: var(${content_icons.effec.icon_color.replace(
              "bg",
              "--clr"
            )})`
          : ""
      };
      ${buildBorder(content_icons.effec.border_width,content_icons.effec.border_style,content_icons.effec.border_color)}
    }
    </style>
      `;
    }
    content_icons.icons.forEach((icon) => {
      icons =
        icons +
        `
      <!-- Enlace a ${icon.name} -->
        <a href="${icon.url}" target="_blank" aria-label="${icon.name}" class="${icon.box_class}" style="${icon.box_style}">
        <i class="bi bi-${icon.name} ${icon.class}"></i>
      </a>
      `;
    });
    let social_icons = document.getElementById("social_icons");
    if (content_icons.class.length > 0) {
      social_icons.className = content_icons.class;
    }
    social_icons.style.cssText = content_icons.style;
    social_icons.innerHTML = icons;
  }
}

function loadbutton(content_buttons) {
  if (!(Object.keys(content_buttons).length === 0)) {
    let buttons = "";
    if (!(Object.keys(content_buttons.effec) === 0)) {
      buttons = `
      <style>
      button:hover{
      ${
        content_buttons.effec.bg_color != ""
          ? `background-color: var(${content_buttons.effec.bg_color.replace(
              "bg",
              "--clr"
            )})`
          : ""
      };
      ${
        content_buttons.effec.text_color != ""
          ? `color: var(${content_buttons.effec.text_color.replace(
              "bg",
              "--clr"
            )})`
          : ""
      };
      ${buildBorder(content_buttons.effec.border_width,content_buttons.effec.border_style,content_buttons.effec.border_color)}
    }
    </style>
      `;
    }
    content_buttons.buttons.forEach((button) => {
      buttons =
        buttons +
        `
        <button class="${(button.class === "") ? '' : button.class}" onclick="window.location.href='${button.url}';" style="${button.style}">${button.name}</button>
      `;
    });
    let link_buttons = document.getElementById("link_buttons");
    if (content_buttons.class.length>0) {
      link_buttons.className = content_buttons.class;
    }
    link_buttons.style.cssText = content_buttons.style;
    link_buttons.innerHTML= buttons;
  }
}

loadData().then(() => {
  // aquí te aseguras de que loadData() ya terminó
  console.log("data:", data);
  loadMain(data.main_class);
  loadContentClass(data.content_class);
  loadContentStyle(data.content_style);
  loadHeader(data.header);
  loadName(data.label_name);
  loadSocialIcon(data.content_icons);
  loadbutton(data.content_buttons);
});

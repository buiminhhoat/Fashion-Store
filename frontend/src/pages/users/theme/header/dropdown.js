const menuHeaders = document.querySelectorAll(".menu-header");

menuHeaders.forEach((menuHeader) => {
  const megaMenu = menuHeader.querySelector(".mega-menu");
  // if (megaMenu) console.log(menuHeader)

  if (megaMenu) {
    menuHeader.addEventListener("mouseenter", function() {
      // Hiển thị mega-menu tương ứng với menu được chọn
      megaMenu.style.display = "block";
    });

    menuHeader.addEventListener("mouseleave", function() {
      // Ẩn mega-menu khi chuột rời khỏi menu-header cha
      megaMenu.style.display = "none";
    });

    // Điều này làm cho mega-menu vẫn mở ra khi di chuột từ menu-header cha vào mega-menu con
    megaMenu.addEventListener("mouseenter", function() {
      megaMenu.style.display = "block";
    });

    // Điều này làm cho mega-menu vẫn mở ra khi di chuột từ mega-menu con ra ngoài
    megaMenu.addEventListener("mouseleave", function() {
      megaMenu.style.display = "none";
    });
  }
});

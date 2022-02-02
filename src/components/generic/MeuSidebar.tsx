import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TabMenu } from "primereact/tabmenu";

const items = [
  { label: "Pong", icon: "pi pi-fw pi-home" },
  { label: "Jogo2", icon: "pi pi-fw pi-calendar" },
  { label: "Jogo3", icon: "pi pi-fw pi-pencil" },
  { label: "Jogo4", icon: "pi pi-fw pi-file" },
  { label: "Jogo5", icon: "pi pi-fw pi-cog" },
];

const MeuSidebar = () => {
  let navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(3);

  const goToPage = (e: any) => {
    setActiveIndex(e.index);

    switch (e.index) {
      case 0:
        navigate("/pong");
        break;
      case 1:
        navigate("/jogo2");
        break;
      case 2:
        navigate("/jogo3");
        break;
      case 3:
        navigate("/jogo4");
        break;
      case 4:
        navigate("/jogo5");
        break;
      default:
        break;
    }
  };

  return (
    <TabMenu
      model={items}
      activeIndex={activeIndex}
      onTabChange={(e) => goToPage(e)}
    />
  );
};

export default MeuSidebar;

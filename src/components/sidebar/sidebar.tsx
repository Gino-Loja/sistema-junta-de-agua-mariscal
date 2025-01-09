import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { PlanillaIcon } from "../icons/planilla-icon";
import { CircleGauge } from 'lucide-react';
import clsx from "clsx";
//import CircleMeterWater from "../icons/sidebar/Circle-meter-water";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem

              title="Inicio"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/users"}
                title="Usuarios"
                icon={<AccountsIcon />}
                href="/users"
              />
              <SidebarItem
                isActive={pathname === "/water-meter"}
                title="Medidores"
                icon={
                  <CircleGauge
                    className={clsx(
                      pathname === "/water-meter"
                        ? "hover:bg-default-100"
                        : "hover:bg-default-100"
                    )}
                    color={pathname === "/water-meter" ? "#0070F0" : "#969696"}
                    fill="none"
                    strokeWidth={2.75}

                  />
                }
                href="/water-meter"
              />

              <SidebarItem

                isActive={pathname === "/payments"}
                title="Payments"
                icon={<PaymentsIcon />}
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={[{ name: "Facturar", href: "/invoice" },
                { name: "Ver Facturas", href: "/invoice/table" },
               ]}
                title="Facturación"
              />
              <SidebarItem
                isActive={pathname === "/meeting"}
                title="Reuniones"
                href="/meeting"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                isActive={pathname === "/incident"}
                title="Incidentes"
                href="/incident"

                icon={<ProductsIcon />}
              />
              <SidebarItem
                isActive={pathname === "/measurement" || pathname === "/measurement/table"}
                title="Lecturas"
                icon={<ReportsIcon />}
                href="/measurement"
              />
              <SidebarItem
                isActive={pathname === "/sheets" || pathname === "/sheets/tableSheets"}
                title="Planillas"
                icon={<PlanillaIcon />}
                href="/sheets"
              />
            </SidebarMenu>



            <SidebarMenu title="General">
              {/* <SidebarItem
                isActive={pathname === "/developers"}
                title="Developers"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={pathname === "/view"}
                title="View Test Data"
                icon={<ViewIcon />}
              /> */}
              <SidebarItem
                isActive={pathname === "/setting" ||
                  pathname === "/setting/company" ||
                  pathname === "/setting/administrator"}
                title="Configuración"
                href="/setting"
                icon={<SettingsIcon />


                }
              />
            </SidebarMenu>

            {/* <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu> */}
          </div>
          
        </div>
      </div>
    </aside>
  );
};

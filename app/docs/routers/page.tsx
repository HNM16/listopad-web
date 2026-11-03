"use client"

import { DocsPageRenderer } from "../_components/docs-page"

export default function DocsRoutersPage() {
  return (
    <DocsPageRenderer
      title={{
        ru: "Маршрутизаторы",
        en: "Routers",
        tj: "Маршрутизаторҳо",
      }}
      description={{
        ru: "Создание маршрутизаторов и организация маршрутизации между сетями.",
        en: "Creating routers and organizing routing between networks.",
        tj: "Эҷоди маршрутизаторҳо ва ташкил кардани routing байни шабакаҳо.",
      }}
      blocks={[
        {
          title: {
            ru: "Что делает маршрутизатор",
            en: "What a Router Does",
            tj: "Маршрутизатор чӣ кор мекунад",
          },
          text: [
            {
              ru: "Маршрутизатор связывает внутренние подсети с внешней сетью и позволяет организовать доступ к интернету и обмен между сегментами.",
              en: "A router connects internal subnets to an external network and enables internet access and communication between segments.",
              tj: "Маршрутизатор subnet-ҳои дохилиро бо шабакаи беруна мепайвандад ва дастрасӣ ба интернет ва табодули байни сегментҳоро таъмин мекунад.",
            },
          ],
          screenshots: [
            {
              src: "/docs/routers/routers-1.png",
              alt: {
                ru: "Раздел маршрутизаторов",
                en: "Routers section",
                tj: "Бахши маршрутизаторҳо",
              },
              caption: {
                ru: "",
                en: "",
                tj: "",
              },
            },
          ],
        },
        {
          title: {
            ru: "Создание маршрутизатора",
            en: "Creating a Router",
            tj: "Эҷоди маршрутизатор",
          },
          text: [
            {
              ru: "В разделе Routers можно создать новый маршрутизатор, задать имя и выбрать внешнюю сеть.",
              en: "In the Routers section you can create a new router, assign a name and choose the external network.",
              tj: "Дар бахши Routers шумо метавонед маршрутизатори нав эҷод кунед, ном диҳед ва шабакаи беруниро интихоб кунед.",
            },
          ],
          steps: [
            {
              ru: "Открой раздел Маршрутизаторы.",
              en: "Open the Routers section.",
              tj: "Бахши Routers-ро кушоед.",
            },
            {
              ru: "Нажми Создать.",
              en: "Click Create.",
              tj: "Create-ро пахш кунед.",
            },
            {
              ru: "Укажи имя маршрутизатора и нужную внешнюю сеть.",
              en: "Enter the router name and choose the required external network.",
              tj: "Номи маршрутизаторро ворид кунед ва шабакаи берунии лозимаро интихоб кунед.",
            },
            {
              ru: "Сохрани настройки.",
              en: "Save the configuration.",
              tj: "Танзимотро нигоҳ доред.",
            },
          ],
          screenshots: [
            {
              src: "/docs/routers/routers-2.png",
              alt: {
                ru: "Создание маршрутизатора",
                en: "Create router",
                tj: "Эҷоди маршрутизатор",
              },
              caption: {
                ru: ".",
                en: "",
                tj: "",
              },
            },
          ],
        },
        {
          title: {
            ru: "Подключение подсетей",
            en: "Attaching Subnets",
            tj: "Пайваст кардани subnet-ҳо",
          },
          text: [
            {
              ru: "После создания маршрутизатора к нему подключаются подсети, чтобы обеспечить обмен трафиком и внешнюю маршрутизацию.",
              en: "After the router is created, subnets are attached to enable traffic exchange and external routing.",
              tj: "Пас аз эҷоди маршрутизатор, subnet-ҳо ба он пайваст карда мешаванд, то табодули трафик ва routing-и беруна таъмин шавад.",
            },
          ],
          screenshots: [
            {
              src: "/docs/routers/routers-3.png",
              alt: {
                ru: "Подключение подсети",
                en: "Attach subnet",
                tj: "Пайваст кардани subnet",
              },
              caption: {
                ru: "",
                en: "",
                tj: "",
              },
            },
            {
              src: "/docs/routers/routers-4.png",
              alt: {
                ru: "Итоговая конфигурация маршрутизатора",
                en: "Final router configuration",
                tj: "Конфигуратсияи ниҳоии маршрутизатор",
              },
              caption: {
                ru: "",
                en: "",
                tj: "",
              },
            },
          ],
        },
      ]}
    />
  )
}
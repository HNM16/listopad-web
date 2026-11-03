"use client"

import { DocsPageRenderer } from "../_components/docs-page"

export default function DocsLoadBalancerPage() {
  return (
    <DocsPageRenderer
      title={{
        ru: "Балансировщик",
        en: "Load Balancer",
        tj: "Балансировщик",
      }}
      description={{
        ru: "Распределение трафика между несколькими виртуальными машинами.",
        en: "Traffic distribution between multiple virtual machines.",
        tj: "Тақсим кардани трафик байни якчанд мошини виртуалӣ.",
      }}
      blocks={[
        {
          title: {
            ru: "Назначение балансировщика",
            en: "Purpose of Load Balancer",
            tj: "Вазифаи балансировщик",
          },
          text: [
            {
              ru: "Балансировщик распределяет входящий трафик между backend-серверами, повышая доступность и масштабируемость сервиса.",
              en: "A load balancer distributes incoming traffic between backend servers, improving service availability and scalability.",
              tj: "Балансировщик трафики воридшавандаро байни backend-серверҳо тақсим мекунад ва дастрасӣ ва масштабпазириро беҳтар месозад.",
            },
          ],
          screenshots: [
            {
              src: "/docs/load-balancer/lb-1.png",
              alt: {
                ru: "Раздел балансировщика",
                en: "Load balancer section",
                tj: "Бахши балансировщик",
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
            ru: "Создание балансировщика",
            en: "Creating a Load Balancer",
            tj: "Эҷоди балансировщик",
          },
          text: [
            {
              ru: "В панели можно создать новый балансировщик, выбрать сеть, listener и привязать backend-группу.",
              en: "In the panel you can create a new load balancer, select a network, listener and attach a backend pool.",
              tj: "Дар панел шумо метавонед балансировщики нав эҷод кунед, шабака, listener ва backend-гурӯҳро интихоб кунед.",
            },
          ],
          steps: [
            {
              ru: "Открой раздел Балансировщики.",
              en: "Open the Load Balancer section.",
              tj: "Бахши Load Balancer-ро кушоед.",
            },
            {
              ru: "Нажми Создать.",
              en: "Click Create.",
              tj: "Create-ро пахш кунед.",
            },
            {
              ru: "Настрой listener и backend-пул.",
              en: "Configure the listener and backend pool.",
              tj: "Listener ва backend-pool-ро танзим кунед.",
            },
            {
              ru: "Добавь backend-узлы.",
              en: "Add backend nodes.",
              tj: "Backend-узлҳоро илова кунед.",
            },
          ],
          screenshots: [
            {
              src: "/docs/load-balancer/lb-2.png",
              alt: {
                ru: "Форма создания балансировщика",
                en: "Create load balancer form",
                tj: "Формаи эҷоди балансировщик",
              },
              caption: {
                ru: "",
                en: ".",
                tj: "",
              },
            },
            
            {
              src: "/docs/load-balancer/lb-3.png",
              alt: {
                ru: "Настройка listener и backend",
                en: "Listener and backend settings",
                tj: "Танзими listener ва backend",
              },
              caption: {
                ru: "",
                en: "",
                tj: "",
              },
            },
            {
              src: "/docs/load-balancer/lb-4.png",
              alt: {
                ru: "Список балансировщиков",
                en: "Load balancer list",
                tj: "Рӯйхати балансировщикҳо",
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
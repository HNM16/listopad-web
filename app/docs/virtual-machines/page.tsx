"use client"

import { DocsPageRenderer } from "../_components/docs-page"

export default function DocsVirtualMachinesPage() {
  return (
    <DocsPageRenderer
      title={{
        ru: "Виртуальные машины",
        en: "Virtual Machines",
        tj: "Мошинҳои виртуалӣ",
      }}
      description={{
        ru: "Создание, запуск и базовая настройка виртуальных машин.",
        en: "Creating, launching and configuring virtual machines.",
        tj: "Эҷод, оғоз ва танзими асосии мошинҳои виртуалӣ.",
      }}
      blocks={[
        {
          title: {
            ru: "Создание ВМ",
            en: "Creating a VM",
            tj: "Эҷоди ВМ",
          },
          text: [
            {
              ru: "Виртуальная машина создаётся из панели управления: выбирается образ системы, ресурсы и сеть.",
              en: "A virtual machine is created from the control panel by selecting a system image, resources and a network.",
              tj: "Мошини виртуалӣ аз панели идоракунӣ бо интихоби образи система, захираҳо ва шабака сохта мешавад.",
            },
          ],
          steps: [
            {
              ru: "Открой раздел Virtual Machines.",
              en: "Open the Virtual Machines section.",
              tj: "Бахши Virtual Machines-ро кушоед.",
            },
            {
              ru: "Нажми Create instance.",
              en: "Click Create instance.",
              tj: "Create instance-ро пахш кунед.",
            },
            {
              ru: "Выбери операционную систему.",
              en: "Choose the operating system.",
              tj: "Системаи оператсиониро интихоб кунед.",
            },
            {
              ru: "Укажи CPU, RAM и диск.",
              en: "Set CPU, RAM and disk size.",
              tj: "CPU, RAM ва ҳаҷми дискро нишон диҳед.",
            },
            {
              ru: "Выбери сеть и метод доступа.",
              en: "Choose network and access method.",
              tj: "Шабака ва усули дастрасиро интихоб кунед.",
            },
          ],
          screenshots: [
            {
              src: "/docs/virtual-machines/vm-1.png",
              alt: {
                ru: "Раздел виртуальных машин",
                en: "Virtual machines section",
                tj: "Бахши мошинҳои виртуалӣ",
              },
              caption: {
                ru: "",
                en: "",
                tj: "",
              },
            },
            {
              src: "/docs/virtual-machines/vm-2.png",
              alt: {
                ru: "Форма создания виртуальной машины",
                en: "Create virtual machine form",
                tj: "Формаи эҷоди мошини виртуалӣ",
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
            ru: "Образ и конфигурация",
            en: "Image and Configuration",
            tj: "Образ ва конфигуратсия",
          },
          text: [
            {
              ru: "При создании можно выбрать операционную систему, тип ресурса, сеть, диск и параметры запуска.",
              en: "During creation you can select the operating system, resource type, network, disk and launch parameters.",
              tj: "Ҳангоми эҷод шумо метавонед системаи оператсионӣ, намуди захира, шабака, диск ва параметрҳои оғозро интихоб кунед.",
            },
          ],
          screenshots: [
            {
              src: "/docs/virtual-machines/vm-3.png",
              alt: {
                ru: "Выбор образа и конфигурации",
                en: "Selecting image and configuration",
                tj: "Интихоби образ ва конфигуратсия",
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
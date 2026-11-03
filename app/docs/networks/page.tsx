"use client"

import { DocsPageRenderer } from "../_components/docs-page"

export default function DocsNetworksPage() {
  return (
    <DocsPageRenderer
      title={{
        ru: "Сети",
        en: "Networks",
        tj: "Шабакаҳо",
      }}
      description={{
        ru: "Создание виртуальных сетей и базовая сетевая логика в облаке.",
        en: "Creating virtual networks and understanding the basic cloud networking logic.",
        tj: "Эҷоди шабакаҳои виртуалӣ ва фаҳмиши мантиқи асосии шабака дар абр.",
      }}
      blocks={[
        {
          title: {
            ru: "Зачем нужны сети",
            en: "Why Networks Are Needed",
            tj: "Шабакаҳо барои чӣ лозиманд",
          },
          text: [
            {
              ru: "Для работы облачной инфраструктуры необходимо создать виртуальные сети, через которые будут взаимодействовать виртуальные машины и другие ресурсы.",
              en: "To operate cloud infrastructure, you need virtual networks through which virtual machines and other resources communicate.",
              tj: "Барои кори инфрасохтори абрӣ бояд шабакаҳои виртуалӣ эҷод шаванд, ки тавассути онҳо мошинҳои виртуалӣ ва дигар захираҳо бо ҳам алоқа мекунанд.",
            },
          ],
          screenshots: [
            {
              src: "/docs/networks/networks-1.jpeg",
              alt: {
                ru: "Раздел сетей",
                en: "Networks section",
                tj: "Бахши шабакаҳо",
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
            ru: "Создание сети",
            en: "Creating a Network",
            tj: "Эҷоди шабака",
          },
          text: [
            {
              ru: "В разделе Networks можно создать новую виртуальную сеть, указав её имя и параметры.",
              en: "In the Networks section you can create a new virtual network by providing its name and parameters.",
              tj: "Дар бахши Networks шумо метавонед шабакаи нави виртуалӣ созед ва номи он ва параметрҳоро нишон диҳед.",
            },
          ],
          steps: [
            {
              ru: "Открой раздел Networks.",
              en: "Open the Networks section.",
              tj: "Бахши Networks-ро кушоед.",
            },
            {
              ru: "Нажми Create.",
              en: "Click Create.",
              tj: "Тугмаи Create-ро пахш кунед.",
            },
            {
              ru: "Укажи имя сети и нужные настройки.",
              en: "Enter the network name and required settings.",
              tj: "Номи шабака ва танзимоти лозимаро ворид кунед.",
            },
            {
              ru: "Сохрани изменения.",
              en: "Save the changes.",
              tj: "Тағйиротро нигоҳ доред.",
            },
          ],
          screenshots: [
            {
              src: "/docs/networks/networks-2.png",
              alt: {
                ru: "Создание сети",
                en: "Create network",
                tj: "Эҷоди шабака",
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
            ru: "Подсети и адресация",
            en: "Subnets and Addressing",
            tj: "Subnet-ҳо ва адресатсия",
          },
          text: [
            {
              ru: "После создания сети обычно настраивается подсеть, которая задаёт диапазон адресов и внутреннюю логику связности.",
              en: "After creating a network, a subnet is usually configured to define the address range and internal connectivity logic.",
              tj: "Пас аз эҷоди шабака одатан subnet танзим мешавад, ки диапазони адресҳо ва мантиқи дохилии алоқаро муайян мекунад.",
            },
          ],
          screenshots: [
            {
              src: "/docs/networks/networks-3.png",
              alt: {
                ru: "Настройка подсети",
                en: "Subnet configuration",
                tj: "Танзими subnet",
              },
              caption: {
                ru: "",
                en: "",
                tj: "",
              },
            },
            {
              src: "/docs/networks/networks-4.png",
              alt: {
                ru: "Список сетей",
                en: "Networks list",
                tj: "Рӯйхати шабакаҳо",
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
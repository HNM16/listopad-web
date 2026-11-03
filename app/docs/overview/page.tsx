"use client"

import { DocsPageRenderer } from "../_components/docs-page"

export default function DocsOverviewPage() {
  return (
    <DocsPageRenderer
      title={{
        ru: "Обзор облака",
        en: "Cloud Overview",
        tj: "Шарҳи абр",
      }}
      description={{
        ru: "Общий обзор панели управления, ресурсов и интерфейса облака.",
        en: "General overview of the cloud dashboard, resources and interface.",
        tj: "Шарҳи умумии панели идоракунӣ, захираҳо ва интерфейси абр.",
      }}
      blocks={[
        {
          title: {
            ru: "Главная панель",
            en: "Main Dashboard",
            tj: "Панели асосӣ",
          },
          text: [
            {
              ru: "Главная страница панели показывает общую информацию о ресурсах облака: виртуальные машины, загрузку оперативной памяти, SSH-ключи, диски, снапшоты и другие элементы инфраструктуры.",
              en: "The main dashboard shows an overall summary of cloud resources: virtual machines, RAM usage, SSH keys, disks, snapshots and other infrastructure elements.",
              tj: "Саҳифаи асосии панел маълумоти умумиро дар бораи захираҳои абр нишон медиҳад: мошинҳои виртуалӣ, истифодаи RAM, калидҳои SSH, дискҳо, snapshot-ҳо ва дигар унсурҳои инфрасохтор.",
            },
          ],
          screenshots: [
            {
              src: "/docs/overview/overview-1.png",
              alt: {
                ru: "Главная страница облачной панели",
                en: "Cloud dashboard main page",
                tj: "Саҳифаи асосии панели абр",
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
            ru: "Сводка по ресурсам",
            en: "Resource Summary",
            tj: "Хулосаи захираҳо",
          },
          text: [
            {
              ru: "На панели можно быстро увидеть текущее количество активных ресурсов и перейти к нужному разделу управления.",
              en: "The dashboard lets you quickly view active resources and navigate to the required management section.",
              tj: "Дар панел шумо метавонед шумораи захираҳои фаъолро зуд бинед ва ба бахши лозима гузаред.",
            },
          ],
          screenshots: [
            {
              src: "/docs/overview/overview-2.png",
              alt: {
                ru: "Обзор ресурсов панели",
                en: "Panel resource overview",
                tj: "Шарҳи захираҳои панел",
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

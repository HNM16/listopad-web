"use client"

import { DocsPageRenderer } from "../_components/docs-page"

export default function DocsFloatingIpPage() {
  return (
    <DocsPageRenderer
      title={{
        ru: "Плавающий IP",
        en: "Floating IP",
        tj: "IP-и шинокунанда",
      }}
      description={{
        ru: "Выделение и привязка внешнего IP-адреса к виртуальной машине.",
        en: "Allocating and attaching a public IP address to a virtual machine.",
        tj: "Ҷудо кардан ва пайваст кардани IP-и беруна ба мошини виртуалӣ.",
      }}
      blocks={[
        {
          title: {
            ru: "Работа с Floating IP",
            en: "Working with Floating IP",
            tj: "Кор бо Floating IP",
          },
          text: [
            {
              ru: "Floating IP используется для предоставления внешнего доступа к виртуальной машине и может быть перепривязан к другому ресурсу.",
              en: "A floating IP is used to provide external access to a virtual machine and can be reassigned to another resource.",
              tj: "Floating IP барои фароҳам кардани дастрасии беруна ба мошини виртуалӣ истифода мешавад ва метавонад ба захираи дигар аз нав пайваст карда шавад.",
            },
          ],
          steps: [
            {
              ru: "Открой раздел Floating IP.",
              en: "Open the Floating IP section.",
              tj: "Бахши Floating IP-ро кушоед.",
            },
            {
              ru: "Выдели новый адрес или используй существующий.",
              en: "Allocate a new address or use an existing one.",
              tj: "IP-и нав ҷудо кунед ё аз мавҷуда истифода баред.",
            },
            {
              ru: "Привяжи адрес к нужной виртуальной машине.",
              en: "Attach the address to the required virtual machine.",
              tj: "IP-ро ба мошини виртуалии лозима пайваст кунед.",
            },
          ],
          screenshots: [
            {
              src: "/docs/floating-ip/fip-1.png",
              alt: {
                ru: "Раздел Floating IP",
                en: "Floating IP section",
                tj: "Бахши Floating IP",
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
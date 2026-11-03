"use client"

import { DocsPageRenderer } from "../_components/docs-page"

export default function DocsSshKeysPage() {
  return (
    <DocsPageRenderer
      title={{
        ru: "SSH ключи",
        en: "SSH Keys",
        tj: "Калидҳои SSH",
      }}
      description={{
        ru: "Добавление SSH-ключей для безопасного доступа к виртуальным машинам.",
        en: "Adding SSH keys for secure access to virtual machines.",
        tj: "Илова кардани калидҳои SSH барои дастрасии амн ба мошинҳои виртуалӣ.",
      }}
      blocks={[
        {
          title: {
            ru: "Добавление SSH-ключа",
            en: "Adding an SSH Key",
            tj: "Илова кардани калиди SSH",
          },
          text: [
            {
              ru: "В панели можно импортировать публичный SSH-ключ, который затем будет использоваться при создании виртуальной машины.",
              en: "The panel lets you import a public SSH key that can later be used during virtual machine creation.",
              tj: "Дар панел шумо метавонед калиди оммавии SSH-ро импорт кунед, ки баъдтар ҳангоми эҷоди мошини виртуалӣ истифода мешавад.",
            },
          ],
          steps: [
            {
              ru: "Открой раздел SSH Keys.",
              en: "Open the SSH Keys section.",
              tj: "Бахши SSH Keys-ро кушоед.",
            },
            {
              ru: "Нажми Добавить или Импортировать Ключ.",
              en: "Click Add or Import key.",
              tj: "Add ё Import key-ро пахш кунед.",
            },
            {
              ru: "Укажи имя ключа и вставь публичный ключ.",
              en: "Enter the key name and paste the public key.",
              tj: "Номи калидро ворид кунед ва калиди оммавиро часпонед.",
            },
          ],
          screenshots: [
            {
              src: "/docs/ssh-keys/ssh-1.png",
              alt: {
                ru: "Раздел SSH Keys",
                en: "SSH Keys section",
                tj: "Бахши SSH Keys",
              },
              caption: {
                ru: "",
                en: "",
                tj: "",
              },
            },
            {
              src: "/docs/ssh-keys/ssh-2.png",
              alt: {
                ru: "Добавление SSH ключа",
                en: "Add SSH key",
                tj: "Илова кардани калиди SSH",
              },
              caption: {
                ru: "Поставь сюда скриншот со стр. 20 PDF.",
                en: "Place the screenshot from PDF page 20 here.",
                tj: "Дар ин ҷо скриншоти саҳифаи 20-и PDF-ро гузор.",
              },
            },
          ],
        },
      ]}
    />
  )
}
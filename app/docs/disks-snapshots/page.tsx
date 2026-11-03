"use client"

import { DocsPageRenderer } from "../_components/docs-page"

export default function DocsDisksSnapshotsPage() {
  return (
    <DocsPageRenderer
      title={{
        ru: "Диски и снапшоты",
        en: "Disks & Snapshots",
        tj: "Дискҳо ва snapshot-ҳо",
      }}
      description={{
        ru: "Работа с дисками, подключением хранилища и снапшотами.",
        en: "Managing disks, storage attachment and snapshots.",
        tj: "Кор бо дискҳо, пайваст кардани storage ва snapshot-ҳо.",
      }}
      blocks={[
        {
          title: {
            ru: "Диски",
            en: "Disks",
            tj: "Дискҳо",
          },
          text: [
            {
              ru: "Диски используются для хранения данных виртуальных машин и могут подключаться как дополнительные тома.",
              en: "Disks are used to store virtual machine data and can be attached as additional volumes.",
              tj: "Дискҳо барои нигоҳдории маълумоти мошинҳои виртуалӣ истифода мешаванд ва метавонанд ҳамчун volume-и иловагӣ пайваст шаванд.",
            },
          ],
          steps: [
            {
              ru: "Открой раздел Disks.",
              en: "Open the Disks section.",
              tj: "Бахши Disks-ро кушоед.",
            },
            {
              ru: "Создай новый диск нужного размера.",
              en: "Create a new disk with the required size.",
              tj: "Диски нави ҳаҷми лозимаро эҷод кунед.",
            },
            {
              ru: "При необходимости подключи его к виртуальной машине.",
              en: "Attach it to a virtual machine if needed.",
              tj: "Агар лозим бошад, онро ба мошини виртуалӣ пайваст кунед.",
            },
          ],
          screenshots: [
            {
              src: "/docs//disk-snapshots/disks-1.png",
              alt: {
                ru: "Раздел дисков",
                en: "Disks section",
                tj: "Бахши дискҳо",
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
            ru: "Снапшоты",
            en: "Snapshots",
            tj: "Snapshot-ҳо",
          },
          text: [
            {
              ru: "Снапшоты позволяют сохранить текущее состояние диска или виртуальной машины для восстановления или резервирования.",
              en: "Snapshots let you preserve the current state of a disk or virtual machine for restore or backup purposes.",
              tj: "Snapshot-ҳо имкон медиҳанд ҳолати ҷории диск ё мошини виртуалӣ барои барқарорсозӣ ё backup нигоҳ дошта шавад.",
            },
          ],
          screenshots: [
            {
              src: "/docs/disk-snapshots/disks-2.png",
              alt: {
                ru: "Раздел снапшотов",
                en: "Snapshots section",
                tj: "Бахши snapshot-ҳо",
              },
              caption: {
                ru: "",
                en: "",
                tj: "",
              },
            },
            {
              src: "/docs/disk-snapshots/disks-3.png",
              alt: {
                ru: "Работа с дисками и снапшотами",
                en: "Working with disks and snapshots",
                tj: "Кор бо дискҳо ва snapshot-ҳо",
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
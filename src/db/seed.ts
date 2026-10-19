import { getStore } from "@/db";
import type { Tx } from "@/db/store";

/**
 * Dados iniciais da Angel Pegue e Monte.
 * "Kits a partir de R$ 99" veio das postagens do Instagram; os demais valores
 * e os fretes são sugestões — ajuste tudo pelo painel (/admin).
 */

type SeedToy = {
  key: string;
  name: string;
  detail?: string;
  description?: string;
  bonus?: string;
  priceCents: number;
  stock?: number;
  image?: string;
  featured?: boolean;
  /** chaves dos itens que formam o combo */
  components?: string[];
};

type SeedCategory = {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  toys: SeedToy[];
};

/** Os avulsos vêm antes dos combos para que os combos encontrem seus componentes. */
const KIT_DESCRIPTION =
  "Painel redondo, cilindros com capas do tema e peças decorativas. Itens podem variar conforme o tema.";

const SEED: SeedCategory[] = [
  {
    slug: "kits-infantis",
    name: "Kits temáticos",
    emoji: "🎂",
    description: "Escolha o tema e monte você mesmo, rapidinho.",
    toys: [
      { key: "alice", name: "Alice no País das Maravilhas", detail: "Kit com painel e cilindros", description: KIT_DESCRIPTION, priceCents: 10900, image: "kit-alice.jpg", featured: true },
      { key: "monstros", name: "Monstros S.A. — Boo", detail: "Kit com painel e cilindros", description: KIT_DESCRIPTION, priceCents: 10900, image: "kit-monstros.jpg", featured: true },
      { key: "princesas", name: "Princesas", detail: "Kit com painel, cilindros e cômoda", description: KIT_DESCRIPTION, priceCents: 10900, image: "kit-princesas.jpg" },
      { key: "rei-leao", name: "Rei Leão", detail: "Kit com painel e cilindros", description: KIT_DESCRIPTION, priceCents: 9900, image: "kit-rei-leao.jpg" },
      { key: "minecraft", name: "Minecraft", detail: "Kit com painel e cilindros", description: KIT_DESCRIPTION, priceCents: 9900, image: "kit-minecraft.jpg" },
      { key: "homem-aranha", name: "Homem-Aranha", detail: "Kit com painel e cilindros", description: KIT_DESCRIPTION, priceCents: 9900, image: "kit-homem-aranha.jpg" },
      { key: "incriveis", name: "Os Incríveis — Zezé", detail: "Kit com painel e cilindros", description: KIT_DESCRIPTION, priceCents: 9900, image: "kit-incriveis.jpg" },
      { key: "mickey", name: "Mickey", detail: "Kit com painel e cilindros", description: KIT_DESCRIPTION, priceCents: 9900, image: "kit-mickey.jpg" },
      { key: "bento-toto", name: "Bento e Totó", detail: "Kit com painel e cilindros", description: KIT_DESCRIPTION, priceCents: 9900, image: "kit-bento-e-toto.jpg" },
    ],
  },
  {
    slug: "cha-de-bebe",
    name: "Chá de bebê e batizado",
    emoji: "🍼",
    description: "Delicadeza para receber quem está chegando.",
    toys: [
      { key: "oh-baby", name: "Oh Baby Rosa", detail: "Painel redondo, arco e cubos BABY", description: "Kit em tons de rosa com painel redondo, painel arco, cilindros e cubos BABY.", priceCents: 11900, image: "kit-oh-baby-rosa.jpg", featured: true },
      { key: "realeza", name: "Ursinha Realeza", detail: "Painel com coroa e cubos BABY", description: "Kit realeza com ursinha, coroas douradas, cilindros e cubos BABY.", priceCents: 11900, image: "kit-cha-realeza-ursinha.jpg" },
    ],
  },
  {
    slug: "adicionais",
    name: "Adicionais",
    emoji: "✨",
    description: "Complete a decoração do seu kit.",
    toys: [
      { key: "arco", name: "Painel arco romano", detail: "Para compor atrás do painel redondo", priceCents: 3000, stock: 2 },
      { key: "neon", name: "Número em neon", detail: "Idade do aniversariante", priceCents: 2500, stock: 2 },
      { key: "comoda", name: "Cômoda provençal branca", detail: "Para o bolo e os doces", priceCents: 3000, stock: 2 },
      { key: "mesa", name: "Mesa de apoio branca", detail: "Para o bolo e os doces", priceCents: 2000, stock: 2 },
      { key: "baloes", name: "Arranjo de balões", detail: "Nas cores do tema", priceCents: 4000, stock: 3 },
      { key: "urso", name: "Urso de pelúcia gigante", detail: "Ideal para chá de bebê", priceCents: 3000 },
      { key: "tapete", name: "Tapete felpudo", detail: "Base para a decoração", priceCents: 1500, stock: 2 },
    ],
  },
  {
    slug: "mini-festas",
    name: "Mini festas",
    emoji: "🎉",
    description: "Kit + adicionais com valor especial.",
    toys: [
      { key: "mf-oh-baby", name: "Mini festa Oh Baby", detail: "Kit Oh Baby + urso gigante + balões", bonus: "tapete felpudo", priceCents: 17900, featured: true, components: ["oh-baby", "urso", "baloes"] },
      { key: "mf-princesas", name: "Mini festa Princesas", detail: "Kit Princesas + neon + balões", priceCents: 15900, components: ["princesas", "neon", "baloes"] },
      { key: "mf-aranha", name: "Mini festa Homem-Aranha", detail: "Kit Homem-Aranha + mesa + balões", priceCents: 14900, components: ["homem-aranha", "mesa", "baloes"] },
    ],
  },
];

/** Na vitrine: kits primeiro, depois chá de bebê, mini festas e adicionais. */
const CATEGORY_ORDER = ["kits-infantis", "cha-de-bebe", "mini-festas", "adicionais"];

/** "Gravataí e região" — fretes simbólicos, edite no painel. */
const REGIONS: { name: string; feeCents: number }[] = [
  { name: "Gravataí", feeCents: 2000 },
  { name: "Cachoeirinha", feeCents: 3000 },
  { name: "Alvorada", feeCents: 3000 },
  { name: "Glorinha", feeCents: 3500 },
  { name: "Porto Alegre", feeCents: 4500 },
];

export const DEFAULT_SETTINGS: Record<string, string> = {
  business_name: "Angel Pegue e Monte",
  whatsapp: "5551981391639",
  instagram: "angel_pegueemonte",
  delivery_time: "09:00",
  return_time: "21:00",
  pickup_address: "",
  deposit_percent: "50",
  notice:
    "Os valores são por diária. A reserva é garantida com sinal de 50%, combinado pelo WhatsApp.",
};

async function seedCatalog(tx: Tx) {
  const existing = await tx.all<{ id: number }>("mi_categories");
  if (existing.length > 0) return;

  const idByKey = new Map<string, number>();

  for (const category of SEED) {
    const created = await tx.insert<{ id: number }>("mi_categories", {
      slug: category.slug,
      name: category.name,
      emoji: category.emoji,
      description: category.description,
      position: CATEGORY_ORDER.indexOf(category.slug),
    });

    for (const [index, toy] of category.toys.entries()) {
      const componentIds = (toy.components ?? [])
        .map((key) => idByKey.get(key))
        .filter((id): id is number => typeof id === "number");

      const inserted = await tx.insert<{ id: number }>("mi_toys", {
        category_id: created.id,
        name: toy.name,
        detail: toy.detail ?? "",
        description: toy.description ?? "",
        bonus: toy.bonus ?? "",
        price_cents: toy.priceCents,
        stock: toy.stock ?? 1,
        image_url: toy.image ? `/kits/${toy.image}` : "",
        component_ids: componentIds,
        available: true,
        featured: toy.featured ?? false,
        position: index,
      });
      idByKey.set(toy.key, inserted.id);
    }
  }
}

async function seedRegionsAndSettings(tx: Tx) {
  const regions = await tx.all<{ id: number }>("mi_regions");
  if (regions.length === 0) {
    for (const [index, region] of REGIONS.entries()) {
      await tx.insert("mi_regions", {
        name: region.name,
        fee_cents: region.feeCents,
        active: true,
        position: index,
      });
    }
  }
  const settings = await tx.settings();
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    if (settings[key] === undefined) await tx.setSetting(key, value);
  }
}

async function prepare() {
  const store = getStore();
  await store.init();
  await store.write(async (tx) => {
    await seedCatalog(tx);
    await seedRegionsAndSettings(tx);
  });
}

let ready: Promise<void> | null = null;

/** Garante estrutura e dados iniciais. Roda uma vez por processo. */
export function ensureReady() {
  if (!ready) {
    ready = prepare().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
}

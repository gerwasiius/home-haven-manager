export default function AboutPage() {
  return (
    <div>
      {/* Hero Image */}
      <div className="h-96 relative">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920"
          alt="About us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="prose prose-lg mx-auto">
          <p className="text-primary italic text-lg leading-relaxed">
            Živimo u prekrasnoj Švicarskoj i već oko 30 godina imamo posebnu vezu s
            Medulinom u Hrvatskoj. Sredinom 1990-ih odlučili smo pustiti novo korijenje
            u malom ribarskom mjestu i od tada provodimo svoje slobodno vrijeme u
            Medulinu, s ljubavlju održavajući kuću i vrt živima.
          </p>

          <p className="text-primary italic text-lg leading-relaxed mt-6">
            Naša ljubav prema ovom slikovitom mjestu na jadranskoj obali, mnogi sunčani
            dani u godini i miris limuna, smokava i maslina nadahnuli su nas da drugima
            pružimo priliku da dožive ljepotu i gostoljubivost Medulina.
          </p>

          <p className="text-primary italic text-lg leading-relaxed mt-6">
            Kao ponosni roditelji triju kćeri koje su sada osnovale vlastite obitelji,
            uživamo provoditi vrijeme s njima, posebno tijekom naših zajedničkih odmora.
          </p>

          <p className="text-primary italic text-lg leading-relaxed mt-6">
            Ovi zajednički trenuci u Medulinu su nam neprocjenjivi i radujemo se što
            ćemo vam pružiti nezaboravan boravak u našim apartmanima.
          </p>

          <p className="text-primary italic text-lg leading-relaxed mt-6">
            Pozivamo vas da postanete dio naše povijesti i otkrijete ljepotu Medulina!
          </p>
        </div>
      </div>
    </div>
  );
}

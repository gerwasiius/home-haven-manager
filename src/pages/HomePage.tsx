import { Link } from 'react-router-dom';
import { SearchBox } from '@/components/search/SearchBox';
import { ApartmentCard } from '@/components/apartments/ApartmentCard';
import { mockApartments } from '@/data/mockData';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const activeApartments = mockApartments.filter(a => a.isActive);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(activeApartments.length / itemsPerSlide);

  const nearbyPlaces = [
    { name: 'Medulinska plaža', time: '5 min hoda', description: 'Prekrasna pješčana plaža s kristalno čistim morem, idealna za obitelji.' },
    { name: 'Park prirode Kamenjak', time: '15 min vožnje', description: 'Prekrasan zaštićeni krajolik s liticama, plažama i raznolikim biljnim i životinjskim svijetom.' },
    { name: 'Arena Pula', time: '20 min vožnje', description: 'Antički rimski amfiteatar, jedan od najbolje očuvanih na svijetu.' },
    { name: 'Lokalni restorani', time: '5-10 min hoda', description: 'Autentična hrvatska kuhinja i svježa riba u obližnjim restoranima.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          {/* Logo Icon */}
          <div className="w-24 h-24 mx-auto mb-4 bg-primary-foreground rounded-full flex items-center justify-center">
            <svg viewBox="0 0 100 60" className="w-16 h-10 text-admin">
              <path
                d="M10 50 Q25 20 50 35 Q75 50 90 20 M10 40 Q25 10 50 25 Q75 40 90 10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-primary-foreground mb-2 drop-shadow-lg">
            MAJSTORIĆ
          </h1>
          <p className="font-heading text-xl md:text-2xl italic text-primary-foreground/90 mb-8">
            — Apartments —
          </p>

          {/* Search Box */}
          <SearchBox variant="hero" />
        </div>

        {/* Navigation Arrows */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors">
          <ChevronRight className="h-6 w-6" />
        </button>
      </section>

      {/* Apartments Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-3">
              Naši apartmani
            </h2>
            <p className="text-muted-foreground">
              Pronađite svoj savršeni dom daleko od doma u Medulinu
            </p>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-3 gap-6">
              {activeApartments.slice(0, 3).map((apartment) => (
                <ApartmentCard key={apartment.id} apartment={apartment} />
              ))}
            </div>

            {/* Pagination Dots */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    className={`w-8 h-2 rounded-full transition-colors ${
                      i === currentSlide ? 'bg-primary' : 'bg-border'
                    }`}
                    onClick={() => setCurrentSlide(i)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Explore Area Section */}
      <section className="py-16 px-4 bg-cream">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-3xl font-semibold text-heading mb-4">
                Istražite okolinu
              </h2>
              <p className="text-muted-foreground mb-8">
                Sve što trebate nalazi se na nekoliko minuta udaljenosti.
              </p>

              <div className="space-y-6">
                {nearbyPlaces.map((place) => (
                  <div key={place.name} className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-heading">
                        {place.name}{' '}
                        <span className="font-normal text-muted-foreground">
                          ({place.time})
                        </span>
                      </h3>
                      <p className="text-sm text-body">{place.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-80 md:h-auto rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11410.073729845892!2d13.929977!3d44.8333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477cd2a7b3e6bd4b%3A0x71e0a3b72a2b4a2c!2sMedulin%2C%20Croatia!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-4">
          Spremni za rezervaciju?
        </h2>
        <p className="text-muted-foreground mb-8">
          Kontaktirajte nas i rezervirajte savršen apartman u Medulinu.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" asChild>
            <Link to="/apartments">Pogledaj sve apartmane</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Kontaktiraj nas</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

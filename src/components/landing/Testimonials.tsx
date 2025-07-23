
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Adeola Peters",
    role: "Student, Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
    testimonial: "Alternative Academy transformed my career. The hands-on projects from the marketplace were invaluable. I landed a full-time remote job before I even finished my learning path!",
  },
  {
    name: "Chinedu Okoro",
    role: "Student, UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop",
    testimonial: "The AI-powered learning path was a game-changer. It kept me focused and motivated. The community is so supportive, and I've made connections that will last a lifetime.",
  },
  {
    name: "Fatima Bello",
    role: "Business Owner",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=50&h=50&fit=crop",
    testimonial: "Finding skilled, reliable talent in Nigeria used to be a challenge. Alternative Academy's marketplace made it easy. We've hired three amazing developers for our projects.",
  },
];

export function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">From Our Community</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardContent className="pt-6">
                <blockquote className="text-sm text-muted-foreground">
                  "{testimonial.testimonial}"
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

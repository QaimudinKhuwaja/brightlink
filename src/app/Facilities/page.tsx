// src/app/components/Facilities.tsx
import { Library, Wifi, Bus, Volleyball, Shield } from "lucide-react";

export default function Facilities() {
  const facilities = [
    {
      title: "Well-Equipped Library",
      description: "Access to a wide range of books and study materials.",
      icon: <Library className="w-10 h-10 text-blue-600" />,
    },
    {
      title: "Digital Learning",
      description: "Smart classrooms with multimedia and internet access.",
      icon: <Wifi className="w-10 h-10 text-green-600" />,
    },
    {
      title: "Sports/Playground & Secure Environment",
      description: "Encouraging physical fitness and extracurricular activities. Safe & supportive environment.",
      icon: <Volleyball className="w-10 h-10 text-purple-600" />,
    },
  ];

  return (
   <section className="py-20 bg-gray-50" id="facilities"> {/* py-12 → py-20 */}
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
      Our <span className="text-blue-600">Facilities</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {facilities.map((facility, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
        >
          <div className="mb-4">{facility.icon}</div>
          <h3 className="text-xl font-semibold text-gray-700">
            {facility.title}
          </h3>
          <p className="mt-2 text-gray-600">{facility.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

  );
}

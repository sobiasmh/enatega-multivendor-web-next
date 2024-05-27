import { FaArrowRight } from "react-icons/fa";

interface Restaurant {
  _id: string;
  name: string;
  image: string;
  slug: string;
  address: string;
  openingTimes: { day: string; times: { startTime: string[]; endTime: string[] }[] }[];
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { name, image, address, openingTimes } = restaurant;

  return (
    <div className="p-4 border flex items-center rounded-lg">
      <img src={image} alt={`${name} image`} className="w-8 h-8 mr-4" />
      <div className="flex flex-col flex-grow">
        <span className="text-gray-700">{name}</span>
        <span className="text-gray-500 text-sm">{address}</span>
       
      </div>
      <FaArrowRight className="text-gray-700" />
    </div>
  );
};

interface RestaurantCardsProps {
  restaurants: Restaurant[];
}

const RestaurantCards: React.FC<RestaurantCardsProps> = ({ restaurants }) => {
  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <span className="text-left text-xl font-bold text-gray-900">Explore Restaurants</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantCards;

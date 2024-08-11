import { useRouter } from 'next/navigation'; // For redirect functionality
import { FileIcon } from 'lucide-react'; // Import the Document icon
import AIChat from "./ai-chat";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import { UserSubMenu, MenuItem } from "./types";

interface HomeViewProps {
  username: string;
  items: UserSubMenu;
}

export default function HomeView(props: HomeViewProps) {
  const { username, items } = props;
  const router = useRouter();

  // Extract the submenu items from the user items
  const allItems = Object.values(items).flatMap(subMenu => Object.values(subMenu).flat());

  // Get the first 10 items or all if fewer
  const itemsToShow = allItems.slice(0, 10);

  // Function to handle redirection
  const handleCardClick = (filename: string | undefined) => {
    if (filename) {
      router.push(`/dashboard/${filename}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <main className="overflow-auto p-4 space-y-4 bg-gray-100 h-full">
        <div className="w-1/2 mx-auto">
          <br />
          <h1 className="font-bold text-2xl text-center">Hello {username}!</h1>
          <br />
        </div>

        {itemsToShow.length > 0 && (
          <div className="w-1/2 mx-auto justify-center">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {itemsToShow.map((item, index) => (
                  <CarouselItem key={index} className="flex-shrink-0 md:basis-1/3 lg:basis-1/4">
                    <div className="p-1 cursor-pointer" onClick={() => handleCardClick(item.fileName)}>
                      <Card className='h-full'>
                        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                          <FileIcon className="text-3xl mb-2 text-gray-500" />
                          <span className="text-sm text-gray-500">{item.label}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <br />
          </div>
        )}

        <div className="w-1/2 mx-auto">
          <AIChat />
        </div>
      </main>
    </div>
  );
}

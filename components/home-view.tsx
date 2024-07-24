import AIChat from "./ai-chat";
import KnowledgeCard from "./knowledge-card";
import RecentSearchesCard from "./recent-searches-card";

export default function HomeView(){
    return (
        <div className="flex-1 flex flex-col">
        <main className="overflow-auto p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <KnowledgeCard />
              <RecentSearchesCard />
            </div>
        </main>
        <AIChat />
      </div>
    )
}
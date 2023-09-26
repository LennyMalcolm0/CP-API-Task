import AppLayout from "./Layout"
import CoverImage from "./components/CoverImage"
import { useState } from 'react';
import PersonalInformation from "./forms/PersonalInformation";
import Profile from "./forms/Profile";
import AdditionalQuestions from "./forms/AdditionalQuestions";

function App() {
  const [coverImageUrl, setCoverImageUrl] = useState("");

  return (
    <>
      <main className="h-screen w-screen overflow-hidden leading-snug">
        <AppLayout children={(
          <div className="px-[70px] pt-[100px] pb-16 flex flex-col gap-16">
            <CoverImage 
              imageUrl={coverImageUrl}
              setImageUrl={setCoverImageUrl}
              inputAttributes={{}}
            />

            <PersonalInformation />
            <Profile />
            <AdditionalQuestions />
          </div>
        )}/>
      </main>
    </>
  )
}

export default App

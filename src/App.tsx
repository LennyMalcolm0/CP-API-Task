import AppLayout from "./Layout"
import CoverImage from "./components/CoverImage"
import { createContext, useEffect, useState } from 'react';
import PersonalInformation from "./forms/PersonalInformation";
import Profile from "./forms/Profile";
import AdditionalQuestions from "./forms/AdditionalQuestions";
import { HttpClient } from "./axiosRequest";
import { ApplicationForm, ApplicationFormData } from "./dataTypes";

export const FormDataContext = createContext<ApplicationFormData | null>(null);

function App() {
  const [formData, setFormData] = useState<ApplicationFormData | null>(null);

  useEffect(() => {
    HttpClient.get<ApplicationForm>("/api/144.9397931391233/programs/mock/application-form")
    .then(({ data }) => {
      if (!data) return;
      console.log(data.data.attributes.customisedQuestions)
      setFormData(data.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <FormDataContext.Provider value={formData}>
      <main className="h-screen w-screen overflow-hidden leading-snug">
        <AppLayout children={(
          <div className="px-[70px] pt-[100px] pb-16 flex flex-col gap-16">
            <CoverImage />
            <PersonalInformation />
            <Profile />
            <AdditionalQuestions />
          </div>
        )}/>
      </main>
    </FormDataContext.Provider>
  )
}

export default App

import { create } from "zustand";
import { LessonMeta, LessonModule } from "../app/lib/lesson";

type ChatMessage = { sender: "user" | "ai"; message: string };

type AppState = {
  // Lesson info
  lessonId: string;
  lessonMeta: LessonMeta | null;
  lessonModules: LessonModule[];
  currentModuleIndex: number;

  // AI agent state
  chatHistory: ChatMessage[];
  transcript: string;

  // Actions
  setLessonId: (id: string) => void;
  setLessonMeta: (meta: LessonMeta) => void;
  setLessonModules: (modules: LessonModule[]) => void;
  nextModule: () => void;
  setTranscript: (text: string) => void;
  pushChat: (message: ChatMessage) => void;
  resetLesson: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  lessonId: "",
  lessonMeta: null,
  lessonModules: [],
  currentModuleIndex: 0,
  chatHistory: [],
  transcript: "",

  // Actions
  setLessonId: (id) => set({ lessonId: id }),
  setLessonMeta: (meta) => set({ lessonMeta: meta }),
  setLessonModules: (modules) => set({ lessonModules: modules }),
  nextModule: () => set((state) => ({ currentModuleIndex: state.currentModuleIndex + 1 })),
  setTranscript: (text) => set({ transcript: text }),
  pushChat: (message) => set((state) => ({ chatHistory: [...state.chatHistory, message] })),
  resetLesson: () =>
    set({
      lessonId: "",
      lessonMeta: null,
      lessonModules: [],
      currentModuleIndex: 0,
      chatHistory: [],
      transcript: "",
    }),
}));

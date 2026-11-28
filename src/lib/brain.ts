export const BRAIN = [
  {
    keywords: ["what is devops", "devops kya hai"],
    question: "What is DevOps?",
    answer: `DevOps = Development + Operations. Developers and Operations team work together, automate build, test, deploy. Goal: Release software faster with less errors. Tools: Git + Jenkins + Docker + Kubernetes + Terraform`,
    fix: "",
    diagram: "Dev -> Git -> Jenkins -> Docker -> K8s -> User"
  },
  {
    keywords: ["what is docker", "docker kya hai"],
    question: "What is Docker?",
    answer: `Docker is a container platform. Think like Tiffin Box. It packs your app + everything it needs into a small box called Container. If it works on your laptop, it works same on server.`,
    fix: "",
    diagram: "Dockerfile -> Image -> Container"
  },
  {
    keywords: ["what is kubernetes", "k8s"],
    question: "What is Kubernetes?",
    answer: `Kubernetes manages 100s of Docker containers automatically. If one crashes, it restarts it. If users increase, it creates more containers. Main parts: Pod, Service, Deployment, Node.`,
    fix: "",
    diagram: "User -> Service -> Pod -> Container"
  },
  {
    keywords: ["what is jenkins", "jenkins kya hai"],
    question: "What is Jenkins?",
    answer: `Jenkins is CI/CD Automation Tool. When you push code to GitHub, Jenkins automatically builds, tests, deploys. Pipeline: Code -> Build -> Test -> Deploy`,
    fix: "",
    diagram: "GitHub -> Jenkins -> Docker -> K8s"
  },
  {
    keywords: ["crashloopbackoff", "crashloop", "pod crash"],
    question: "K8s CrashLoopBackOff",
    answer: `ERROR: Pod keeps crashing and restarting. WHY: App crashing inside pod - wrong image, missing env, port error. FIX: kubectl describe pod <pod-name> and kubectl logs <pod-name> --previous`,
    fix: "kubectl logs <pod-name>",
    diagram: ""
  }
]

export function askBrain(userInput: string) {
  const input = userInput.toLowerCase();
  for (const item of BRAIN) {
    if (item.keywords.some(k => input.includes(k))) {
      return item;
    }
  }
  return {
    question: "Not in Brain Yet",
    answer: `I don't have this in my own brain yet. I only answer from my OWN DevOps database. Try asking: What is Docker? / What is Jenkins? / What is DevOps? / CrashLoopBackOff`,
    fix: "",
    diagram: ""
  }
}

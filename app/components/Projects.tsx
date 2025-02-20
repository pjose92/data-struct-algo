// "use client";

// import { useState } from "react";
// import styled from "styled-components";
// import { Github, ExternalLink } from "lucide-react";

// const ProjectsSection = styled.section`
//   padding: 6rem 2rem;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const Title = styled.h2`
//   font-size: 2rem;
//   color: #ccd6f6;
//   margin-bottom: 3rem;
// `;

// const TabContainer = styled.div`
//   display: flex;
//   gap: 2rem;
//   margin-bottom: 3rem;
// `;

// const Tab = styled.button<{ active: boolean }>`
//   background: none;
//   border: none;
//   color: ${(props) => (props.active ? "#64ffda" : "#8892b0")};
//   font-size: 1.1rem;
//   cursor: pointer;
//   padding-bottom: 0.5rem;
//   border-bottom: 2px solid
//     ${(props) => (props.active ? "#64ffda" : "transparent")};
//   transition: all 0.2s ease;

//   &:hover {
//     color: #64ffda;
//   }
// `;

// const ProjectGrid = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 4rem;
// `;

// const ProjectCard = styled.div<{ isEven: boolean }>`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 2rem;
//   background: #112240;
//   border-radius: 8px;
//   overflow: hidden;
//   transition: transform 0.2s ease;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }

//   &:hover {
//     transform: translateY(-5px);
//   }

//   ${(props) =>
//     props.isEven &&
//     `
//     direction: rtl;

//     > * {
//       direction: ltr;
//     }
//   `}
// `;

// const ProjectContent = styled.div`
//   padding: 2.5rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const ProjectImage = styled.div`
//   background-size: cover;
//   background-position: center;
//   min-height: 300px;
//   width: 100%;
// `;

// const ProjectTitle = styled.h3`
//   color: #ccd6f6;
//   font-size: 1.5rem;
//   margin-bottom: 1rem;
// `;

// const ProjectDescription = styled.p`
//   color: #8892b0;
//   margin-bottom: 1.5rem;
//   line-height: 1.6;
// `;

// const ProjectLinks = styled.div`
//   display: flex;
//   gap: 1rem;

//   a {
//     color: #ccd6f6;
//     transition: color 0.2s ease;

//     &:hover {
//       color: #64ffda;
//     }
//   }
// `;

// type Project = {
//   title: string;
//   description: string;
//   liveUrl: string;
//   githubUrl: string;
//   imageUrl: string;
// };

// const frontendProjects: Project[] = [
//   {
//     title: "E-commerce Platform",
//     description:
//       "A modern e-commerce platform built with Next.js and Styled Components. Features include product filtering, cart management, and responsive design. Implemented best practices for performance and accessibility.",
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example",
//     imageUrl:
//       "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
//   },
//   {
//     title: "Weather Dashboard",
//     description:
//       "Real-time weather dashboard using OpenWeather API. Built with React and features dynamic theming based on weather conditions. Includes detailed forecasts, weather maps, and location search functionality.",
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example",
//     imageUrl:
//       "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
//   },
// ];

// const uxProjects: Project[] = [
//   {
//     title: "Banking App Redesign",
//     description:
//       "Complete UX case study and redesign of a mobile banking application. Focused on improving user flow and accessibility. Conducted user research, created wireframes, and developed high-fidelity prototypes.",
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example",
//     imageUrl:
//       "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
//   },
//   {
//     title: "Food Delivery App",
//     description:
//       "UX/UI design for a food delivery application. Includes user research, wireframes, and high-fidelity prototypes. Focused on creating an intuitive ordering process and seamless checkout experience.",
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example",
//     imageUrl:
//       "https://images.unsplash.com/photo-1466096115517-bceecbfb6fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
//   },
// ];

// export default function Projects() {
//   const [activeTab, setActiveTab] =
//     (useState < "frontend") | ("ux" > "frontend");

//   const projects = activeTab === "frontend" ? frontendProjects : uxProjects;

//   return (
//     <ProjectsSection id="projects">
//       <Title>Projects</Title>
//       <TabContainer>
//         <Tab
//           active={activeTab === "frontend"}
//           onClick={() => setActiveTab("frontend")}>
//           Frontend Work
//         </Tab>
//         <Tab active={activeTab === "ux"} onClick={() => setActiveTab("ux")}>
//           UX Work
//         </Tab>
//       </TabContainer>
//       <ProjectGrid>
//         {projects.map((project, index) => (
//           <ProjectCard key={index} isEven={index % 2 === 1}>
//             <ProjectContent>
//               <ProjectTitle>{project.title}</ProjectTitle>
//               <ProjectDescription>{project.description}</ProjectDescription>
//               <ProjectLinks>
//                 <a
//                   href={project.githubUrl}
//                   target="_blank"
//                   rel="noopener noreferrer">
//                   <Github size={20} />
//                 </a>
//                 <a
//                   href={project.liveUrl}
//                   target="_blank"
//                   rel="noopener noreferrer">
//                   <ExternalLink size={20} />
//                 </a>
//               </ProjectLinks>
//             </ProjectContent>
//             <ProjectImage
//               style={{ backgroundImage: `url(${project.imageUrl})` }}
//             />
//           </ProjectCard>
//         ))}
//       </ProjectGrid>
//     </ProjectsSection>
//   );
// }

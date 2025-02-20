"use client";

import styled, { keyframes } from "styled-components";
import {
  RepeatIcon as ReactIcon,
  Code2,
  Paintbrush,
  FileJson,
  Cpu,
  Blocks,
  TestTube2,
  BookOpen,
  Palette,
  Flag,
  ListTodo,
  LayoutGrid,
} from "lucide-react";

const AboutSection = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #ccd6f6;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  color: #8892b0;
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 800px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const TechItem = styled.div`
  color: #8892b0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  background: #112240;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${(props) => props.delay}ms;
  opacity: 0;

  &:hover {
    transform: translateY(-5px);
    background: #1a2f55;
    color: #64ffda;

    svg {
      color: #64ffda;
    }
  }

  svg {
    color: #ccd6f6;
    transition: color 0.3s ease;
  }
`;

const technologies = [
  { name: "React.JS", icon: ReactIcon },
  { name: "Next.JS", icon: Blocks },
  { name: "Styled-Components", icon: Paintbrush },
  { name: "HTML", icon: Code2 },
  { name: "CSS", icon: Palette },
  { name: "JavaScript", icon: FileJson },
  { name: "Jest", icon: TestTube2 },
  { name: "Storybook", icon: BookOpen },
  { name: "Figma", icon: Cpu },
  { name: "LaunchDarkly", icon: Flag },
  { name: "Shortcut", icon: ListTodo },
  { name: "Jira", icon: LayoutGrid },
];

export default function About() {
  return (
    <AboutSection id="about">
      <Title>About Me</Title>
      <Content>
        <p>
          Hi there! My name is Jose Perez and I am always ready to start a new
          project and start building amazing things on the internet.
        </p>
        <h3
          style={{ marginTop: "2rem", marginBottom: "1rem", color: "#ccd6f6" }}>
          So, who am I?
        </h3>
        <p>
          I am a Frontend Engineer with experience in e-commerce and marketing
          agencies. Currently based in Chicago, I am passionate about creating
          high-quality and user-friendly web experiences. I have a proven track
          record of developing responsive and accessible websites that meet
          business objectives and enhance the user experience.
        </p>
        <p style={{ marginTop: "1rem" }}>
          I have always loved creating things that rely on new technologies,
          especially in the #Front-End. My goal is to improve my skills and best
          practices. I love building web applications with #React and #NextJS.
        </p>
        <h3
          style={{ marginTop: "2rem", marginBottom: "1rem", color: "#ccd6f6" }}>
          Technologies I've worked with:
        </h3>
        <TechGrid>
          {technologies.map((tech, index) => (
            <TechItem key={tech.name} delay={index * 100}>
              <tech.icon size={20} />
              {tech.name}
            </TechItem>
          ))}
        </TechGrid>
      </Content>
    </AboutSection>
  );
}

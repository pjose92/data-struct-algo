"use client";

import styled from "styled-components";
import { Github, Linkedin } from "lucide-react";

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Greeting = styled.p`
  color: #64ffda;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Name = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ccd6f6;
`;

const Tagline = styled.h2`
  font-size: 2.5rem;
  color: #8892b0;
  margin-bottom: 2rem;
`;

const Location = styled.p`
  font-size: 1.25rem;
  color: #8892b0;
  margin-bottom: 2rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: #ccd6f6;
    transition: color 0.2s ease;

    &:hover {
      color: #64ffda;
    }
  }
`;

export default function Hero() {
  return (
    <HeroSection>
      <Greeting>Hi there, my name is</Greeting>
      <Name>Jose Perez Guerrero</Name>
      <Tagline>Let's build things together.</Tagline>
      <Location>Frontend Engineer and UX Designer based in Chicago.</Location>
      <SocialLinks>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer">
          <Github size={24} />
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer">
          <Linkedin size={24} />
        </a>
      </SocialLinks>
    </HeroSection>
  );
}

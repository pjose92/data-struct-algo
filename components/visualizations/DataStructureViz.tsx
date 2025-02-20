"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Node {
  value: string | number;
  x: number;
  y: number;
  next?: Node;
}

interface VisualizationProps {
  type: string;
}

export function DataStructureViz({ type }: VisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw based on structure type
    switch (type) {
      case 'array-viz':
        drawArray(ctx, nodes);
        break;
      case 'linked-list-viz':
        drawLinkedList(ctx, nodes);
        break;
      case 'stack-viz':
        drawStack(ctx, nodes);
        break;
      case 'queue-viz':
        drawQueue(ctx, nodes);
        break;
    }
  }, [nodes, type]);

  const drawArray = (ctx: CanvasRenderingContext2D, nodes: Node[]) => {
    const boxSize = 60;
    const startX = 50;
    const startY = 100;

    nodes.forEach((node, index) => {
      // Draw box
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      ctx.strokeRect(startX + index * boxSize, startY, boxSize, boxSize);

      // Draw value
      ctx.fillStyle = '#333';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        node.value.toString(),
        startX + index * boxSize + boxSize / 2,
        startY + boxSize / 2
      );

      // Draw index
      ctx.fillStyle = '#666';
      ctx.font = '14px Arial';
      ctx.fillText(
        index.toString(),
        startX + index * boxSize + boxSize / 2,
        startY - 10
      );
    });
  };

  const drawLinkedList = (ctx: CanvasRenderingContext2D, nodes: Node[]) => {
    const boxSize = 60;
    const startX = 50;
    const startY = 100;

    nodes.forEach((node, index) => {
      // Draw node
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      ctx.strokeRect(startX + index * (boxSize + 40), startY, boxSize, boxSize);

      // Draw value
      ctx.fillStyle = '#333';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        node.value.toString(),
        startX + index * (boxSize + 40) + boxSize / 2,
        startY + boxSize / 2
      );

      // Draw arrow
      if (index < nodes.length - 1) {
        ctx.beginPath();
        ctx.moveTo(startX + index * (boxSize + 40) + boxSize, startY + boxSize / 2);
        ctx.lineTo(startX + (index + 1) * (boxSize + 40), startY + boxSize / 2);
        ctx.stroke();

        // Draw arrowhead
        ctx.beginPath();
        ctx.moveTo(startX + (index + 1) * (boxSize + 40), startY + boxSize / 2);
        ctx.lineTo(
          startX + (index + 1) * (boxSize + 40) - 10,
          startY + boxSize / 2 - 5
        );
        ctx.lineTo(
          startX + (index + 1) * (boxSize + 40) - 10,
          startY + boxSize / 2 + 5
        );
        ctx.closePath();
        ctx.fill();
      }
    });
  };

  const drawStack = (ctx: CanvasRenderingContext2D, nodes: Node[]) => {
    const boxSize = 60;
    const startX = 150;
    const startY = 200;

    nodes.forEach((node, index) => {
      const y = startY - index * boxSize;
      
      // Draw box
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      ctx.strokeRect(startX, y, boxSize, boxSize);

      // Draw value
      ctx.fillStyle = '#333';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(node.value.toString(), startX + boxSize / 2, y + boxSize / 2);
    });
  };

  const drawQueue = (ctx: CanvasRenderingContext2D, nodes: Node[]) => {
    const boxSize = 60;
    const startX = 50;
    const startY = 100;

    nodes.forEach((node, index) => {
      // Draw box
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      ctx.strokeRect(startX + index * boxSize, startY, boxSize, boxSize);

      // Draw value
      ctx.fillStyle = '#333';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        node.value.toString(),
        startX + index * boxSize + boxSize / 2,
        startY + boxSize / 2
      );

      // Label front and rear
      if (index === 0) {
        ctx.fillText('Front', startX + index * boxSize + boxSize / 2, startY - 10);
      }
      if (index === nodes.length - 1) {
        ctx.fillText('Rear', startX + index * boxSize + boxSize / 2, startY - 10);
      }
    });
  };

  const handleAdd = () => {
    if (!inputValue) return;

    let newNodes = [...nodes];
    switch (type) {
      case 'array-viz':
      case 'linked-list-viz':
        newNodes.push({ value: inputValue, x: 0, y: 0 });
        break;
      case 'stack-viz':
        newNodes.push({ value: inputValue, x: 0, y: 0 });
        break;
      case 'queue-viz':
        newNodes.push({ value: inputValue, x: 0, y: 0 });
        break;
    }
    setNodes(newNodes);
    setInputValue('');
  };

  const handleRemove = () => {
    if (nodes.length === 0) return;

    let newNodes = [...nodes];
    switch (type) {
      case 'array-viz':
        newNodes.pop();
        break;
      case 'stack-viz':
        newNodes.pop();
        break;
      case 'queue-viz':
        newNodes.shift();
        break;
      case 'linked-list-viz':
        newNodes.pop();
        break;
    }
    setNodes(newNodes);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="w-32"
        />
        <Button onClick={handleAdd}>Add</Button>
        <Button variant="outline" onClick={handleRemove}>
          Remove
        </Button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={300}
        className="border rounded-lg bg-white"
      />
    </div>
  );
}
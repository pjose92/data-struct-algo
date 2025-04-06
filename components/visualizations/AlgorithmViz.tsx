"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface VisualizationProps {
  type: string;
}

interface Step {
  array: number[];
  description: string;
  comparingIndices: number[];
  swappedIndices: number[];
}

export function AlgorithmViz({ type }: VisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [array, setArray] = useState<number[]>([]);
  // const [inputValue, setInputValue] = useState('');
  const [sorting, setSorting] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [searchValue, setSearchValue] = useState<number>(0);
  const [searchIndex, setSearchIndex] = useState<number>(-1);
  const [speed, setSpeed] = useState<number>(1000); // milliseconds between steps
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (steps.length > 0 && currentStep >= 0) {
      const step = steps[currentStep];
      drawArray(
        ctx,
        step.array,
        step.comparingIndices,
        step.swappedIndices,
        searchIndex
      );
    } else {
      drawArray(ctx, array, [], [], searchIndex);
    }
  }, [array, currentStep, searchIndex, steps]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isAutoPlaying && currentStep < steps.length - 1) {
      intervalId = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsAutoPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlaying, currentStep, steps.length, speed]);

  const drawArray = (
    ctx: CanvasRenderingContext2D,
    arr: number[],
    comparingIndices: number[] = [],
    swappedIndices: number[] = [],
    searchHighlight: number = -1
  ) => {
    const barWidth = 40;
    const spacing = 10;
    const maxHeight = 200;
    const startX = 50;
    const startY = 250;

    // Draw array access count
    ctx.fillStyle = "#666";
    ctx.font = "14px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`Array Accesses: ${currentStep + 1}`, 10, 30);

    arr.forEach((value, index) => {
      const height = (value / Math.max(...arr)) * maxHeight;
      const x = startX + index * (barWidth + spacing);
      const y = startY - height;

      // Determine bar color based on its state
      let color = "#4dabf7"; // Default blue
      if (comparingIndices.includes(index)) {
        color = "#ffd43b"; // Yellow for comparing
      }
      if (swappedIndices.includes(index)) {
        color = "#ff6b6b"; // Red for swapped
      }
      if (index === searchHighlight) {
        color = "#4ade80"; // Green for found element
      }

      // Draw bar
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth, height);

      // Draw border
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, barWidth, height);

      // Draw value
      ctx.fillStyle = "#333";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.fillText(value.toString(), x + barWidth / 2, startY + 20);

      // Draw index
      ctx.fillStyle = "#666";
      ctx.font = "12px Arial";
      ctx.fillText(`[${index}]`, x + barWidth / 2, startY + 35);
    });
  };

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(newArray);
    setSteps([]);
    setCurrentStep(-1);
    setSearchIndex(-1);
    setIsAutoPlaying(false);
  };

  const bubbleSort = async () => {
    setSorting(true);
    const arr = [...array];
    const newSteps: Step[] = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        const step: Step = {
          array: [...arr],
          description: `Comparing elements at indices ${j} and ${j + 1}`,
          comparingIndices: [j, j + 1],
          swappedIndices: [],
        };

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          step.description += ` and swapping them because ${arr[j + 1]} > ${
            arr[j]
          }`;
          step.swappedIndices = [j, j + 1];
        }

        newSteps.push(step);
      }
    }

    setSteps(newSteps);
    setCurrentStep(0);
    setSorting(false);
  };

  const quickSort = async () => {
    setSorting(true);
    const arr = [...array];
    const newSteps: Step[] = [];

    const partition = (arr: number[], low: number, high: number) => {
      const pivot = arr[high];
      let i = low - 1;

      newSteps.push({
        array: [...arr],
        description: `Choosing pivot value: ${pivot}`,
        comparingIndices: [high],
        swappedIndices: [],
      });

      for (let j = low; j < high; j++) {
        newSteps.push({
          array: [...arr],
          description: `Comparing element ${arr[j]} with pivot ${pivot}`,
          comparingIndices: [j, high],
          swappedIndices: [],
        });

        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          newSteps.push({
            array: [...arr],
            description: `Swapping elements ${arr[i]} and ${arr[j]}`,
            comparingIndices: [j, high],
            swappedIndices: [i, j],
          });
        }
      }

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      newSteps.push({
        array: [...arr],
        description: `Placing pivot ${pivot} in its final position`,
        comparingIndices: [],
        swappedIndices: [i + 1, high],
      });

      return i + 1;
    };

    const sort = (arr: number[], low: number, high: number) => {
      if (low < high) {
        const pi = partition(arr, low, high);
        sort(arr, low, pi - 1);
        sort(arr, pi + 1, high);
      }
    };

    sort(arr, 0, arr.length - 1);
    setSteps(newSteps);
    setCurrentStep(0);
    setSorting(false);
  };

  const binarySearch = () => {
    const sortedArray = [...array].sort((a, b) => a - b);
    setArray(sortedArray);

    const newSteps: Step[] = [];
    let left = 0;
    let right = sortedArray.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      newSteps.push({
        array: sortedArray,
        description: `Checking middle element at index ${mid}: ${sortedArray[mid]}`,
        comparingIndices: [mid],
        swappedIndices: [],
      });

      if (sortedArray[mid] === searchValue) {
        newSteps.push({
          array: sortedArray,
          description: `Found ${searchValue} at index ${mid}!`,
          comparingIndices: [],
          swappedIndices: [],
        });
        setSearchIndex(mid);
        setSteps(newSteps);
        setCurrentStep(0);
        return;
      }

      if (sortedArray[mid] < searchValue) {
        left = mid + 1;
        newSteps.push({
          array: sortedArray,
          description: `${searchValue} is greater than ${sortedArray[mid]}, searching right half`,
          comparingIndices: [],
          swappedIndices: [],
        });
      } else {
        right = mid - 1;
        newSteps.push({
          array: sortedArray,
          description: `${searchValue} is less than ${sortedArray[mid]}, searching left half`,
          comparingIndices: [],
          swappedIndices: [],
        });
      }
    }

    newSteps.push({
      array: sortedArray,
      description: `${searchValue} not found in the array`,
      comparingIndices: [],
      swappedIndices: [],
    });

    setSearchIndex(-1);
    setSteps(newSteps);
    setCurrentStep(0);
  };

  const visualizeStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
    }
  };

  const getAlgorithmDescription = () => {
    switch (type) {
      case "bubble-sort-viz":
        return "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.";
      case "quick-sort-viz":
        return "Quick Sort picks a 'pivot' element and partitions the array around it, then recursively sorts the sub-arrays.";
      case "binary-search-viz":
        return "Binary Search efficiently finds items in a sorted array by repeatedly dividing the search interval in half.";
      default:
        return "";
    }
  };

  const renderControls = () => {
    const commonControls = (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={generateRandomArray}>Generate Random Array</Button>
          {type.includes("sort") && (
            <Button
              onClick={type === "bubble-sort-viz" ? bubbleSort : quickSort}
              disabled={sorting}>
              Sort
            </Button>
          )}
          {type === "binary-search-viz" && (
            <>
              <Input
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(Number(e.target.value))}
                placeholder="Search value"
                className="w-32"
              />
              <Button onClick={binarySearch}>Search</Button>
            </>
          )}
        </div>

        {steps.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => visualizeStep(currentStep - 1)}
                disabled={currentStep <= 0}>
                Previous Step
              </Button>
              <Button onClick={() => setIsAutoPlaying(!isAutoPlaying)}>
                {isAutoPlaying ? "Pause" : "Auto Play"}
              </Button>
              <Button
                onClick={() => visualizeStep(currentStep + 1)}
                disabled={currentStep >= steps.length - 1}>
                Next Step
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm">Speed:</span>
                <Input
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-32"
                />
                <span className="text-sm">{speed}ms</span>
              </div>
            </div>

            <Card className="p-4 bg-muted">
              <p className="text-sm font-medium">
                Step {currentStep + 1} of {steps.length}:
              </p>
              <p className="text-sm text-muted-foreground">
                {steps[currentStep]?.description}
              </p>
            </Card>
          </div>
        )}
      </div>
    );

    return (
      <div className="space-y-4">
        <Card className="p-4 bg-muted">
          <p className="text-sm">{getAlgorithmDescription()}</p>
        </Card>
        {commonControls}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {renderControls()}
      <canvas
        ref={canvasRef}
        width={800}
        height={300}
        className="border rounded-lg bg-white"
      />
    </div>
  );
}

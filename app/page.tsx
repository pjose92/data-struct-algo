"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code, BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const topics = {
  dataStructures: [
    {
      title: "Array",
      description:
        "A collection of elements stored in contiguous memory locations.",
      example:
        "Storing a list of temperatures for the week (e.g., Monday to Sunday).",
      code: `const temperatures = [22, 24, 21, 23, 25, 20, 19];
// Accessing elements
console.log(temperatures[0]); // Monday's temperature: 22
// Adding an element
temperatures.push(18);
// Removing last element
temperatures.pop();`,
      visualization: "array-viz",
    },
    {
      title: "Linked List",
      description:
        "A linear collection of elements, where each element points to the next.",
      example: "A playlist of songs, where each song points to the next one.",
      code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
}`,
      visualization: "linked-list-viz",
    },
    {
      title: "Stack",
      description: "A Last-In-First-Out (LIFO) data structure.",
      example: "Browser history, undo operations in text editors.",
      code: `class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}`,
      visualization: "stack-viz",
    },
    {
      title: "Queue",
      description: "A First-In-First-Out (FIFO) data structure.",
      example: "Print queue, task scheduling.",
      code: `class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) return "Queue is empty";
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) return "Queue is empty";
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}`,
      visualization: "queue-viz",
    },
  ],
  algorithms: [
    {
      title: "Bubble Sort",
      description:
        "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
      example: "Sorting a list of numbers in ascending order.",
      code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      visualization: "bubble-sort-viz",
    },
    {
      title: "Binary Search",
      description:
        "An efficient algorithm for finding an item from a sorted list by repeatedly dividing the search interval in half.",
      example: "Looking up a word in a dictionary.",
      code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      visualization: "binary-search-viz",
    },
    {
      title: "Quick Sort",
      description:
        "An efficient, in-place sorting algorithm that uses divide-and-conquer strategy.",
      example: "Sorting large datasets, like sorting files by size.",
      code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      visualization: "quick-sort-viz",
    },
    {
      title: "Merge Sort",
      description:
        "A divide-and-conquer sorting algorithm that recursively breaks down a problem into smaller, more manageable subproblems until they become simple enough to solve directly.",
      example: "Sorting large datasets that don't fit in memory.",
      code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}`,
      visualization: "merge-sort-viz",
    },
  ],
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("dataStructures");
  const [selectedTopic, setSelectedTopic] = useState(topics.dataStructures[0]);
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold">Data Structures & Algorithms</h1>
          <p className="text-muted-foreground mt-2">
            Interactive guide to fundamental computer science concepts
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={(tab) => {
            setActiveTab(tab);
            setSelectedTopic(topics[tab as keyof typeof topics][0]);
          }}
          className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dataStructures">Data Structures</TabsTrigger>
            <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[70vh]">
                <div className="space-y-2">
                  {topics[activeTab as keyof typeof topics].map((topic) => (
                    <Button
                      key={topic.title}
                      variant={
                        selectedTopic.title === topic.title
                          ? "secondary"
                          : "ghost"
                      }
                      className="w-full justify-start"
                      onClick={() => setSelectedTopic(topic)}>
                      {topic.title}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{selectedTopic.title}</CardTitle>
                <CardDescription>{selectedTopic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-2">
                    <BookOpen />
                    <div>
                      <h3 className="font-semibold">Example case use</h3>
                      <p className="text-muted-foreground">
                        {selectedTopic.example}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Code />
                      <h3 className="font-semibold">Implementation</h3>
                    </div>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>{selectedTopic.code}</code>
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Play />
                      <h3 className="font-semibold">Visualization</h3>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      render visualization here
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

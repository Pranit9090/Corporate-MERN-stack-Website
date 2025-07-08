import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Checkbox } from "../components/ui/Checkbox"; 
import { Repeat2, NotebookPen } from "lucide-react";
import leetcodeLogo from "/assets/logos/leetcode.svg";

const streakData = [
  { day: "Mon", problems: 1 },
  { day: "Tue", problems: 2 },
  { day: "Wed", problems: 1 },
  { day: "Thu", problems: 3 },
  { day: "Fri", problems: 2 },
  { day: "Sat", problems: 4 },
  { day: "Sun", problems: 2 },
];

const dsaTopics = [
  {
    topic: "Arrays",
    questions: [
      { name: "Two Sum", link: "https://leetcode.com/problems/two-sum/" },
      { name: "Best Time to Buy and Sell Stock", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { name: "Merge Intervals", link: "https://leetcode.com/problems/merge-intervals/" },
      { name: "Maximum Subarray", link: "https://leetcode.com/problems/maximum-subarray/" },
      { name: "Product of Array Except Self", link: "https://leetcode.com/problems/product-of-array-except-self/" },
    ],
  },
  {
    topic: "Strings",
    questions: [
      { name: "Valid Anagram", link: "https://leetcode.com/problems/valid-anagram/" },
      { name: "Longest Common Prefix", link: "https://leetcode.com/problems/longest-common-prefix/" },
      { name: "Palindrome Check", link: "https://leetcode.com/problems/valid-palindrome/" },
      { name: "Longest Palindromic Substring", link: "https://leetcode.com/problems/longest-palindromic-substring/" },
      { name: "Group Anagrams", link: "https://leetcode.com/problems/group-anagrams/" },
    ],
  },
  {
    topic: "Linked List",
    questions: [
      { name: "Reverse Linked List", link: "https://leetcode.com/problems/reverse-linked-list/" },
      { name: "Merge Two Sorted Lists", link: "https://leetcode.com/problems/merge-two-sorted-lists/" },
      { name: "Linked List Cycle", link: "https://leetcode.com/problems/linked-list-cycle/" },
      { name: "Remove Nth Node", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
      { name: "Middle of Linked List", link: "https://leetcode.com/problems/middle-of-the-linked-list/" },
    ],
  },
  {
    topic: "Trees",
    questions: [
      { name: "Invert Binary Tree", link: "https://leetcode.com/problems/invert-binary-tree/" },
      { name: "Max Depth of Binary Tree", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
      { name: "Diameter of Binary Tree", link: "https://leetcode.com/problems/diameter-of-binary-tree/" },
      { name: "Same Tree", link: "https://leetcode.com/problems/same-tree/" },
      { name: "Subtree of Another Tree", link: "https://leetcode.com/problems/subtree-of-another-tree/" },
    ],
  },
  {
    topic: "Graphs",
    questions: [
      { name: "Number of Islands", link: "https://leetcode.com/problems/number-of-islands/" },
      { name: "Clone Graph", link: "https://leetcode.com/problems/clone-graph/" },
      { name: "Course Schedule", link: "https://leetcode.com/problems/course-schedule/" },
      { name: "Pacific Atlantic Water Flow", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
      { name: "Graph Valid Tree", link: "https://leetcode.com/problems/graph-valid-tree/" },
    ],
  },
];

export default function DSATracker() {
  const [completed, setCompleted] = useState({});

  const handleCheck = (topic, index) => {
    const key = `${topic}-${index}`;
    setCompleted({ ...completed, [key]: !completed[key] });
  };

  return (
    <div className="px-6 py-10 space-y-12 bg-gray-50 min-h-screen">
      {/* Section 1: Streak Chart */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">📈 Daily Streak Chart</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={streakData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="problems" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Section 2: DSA Topic Questions */}
      <div className="space-y-10">
        {dsaTopics.map((topicBlock, tIndex) => (
          <div key={tIndex} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <details open>
              <summary className="text-2xl font-semibold text-blue-700 cursor-pointer mb-4">
                {topicBlock.topic}
              </summary>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead className="text-gray-600 font-medium">
                    <tr>
                      <th className="py-2 px-4">Track</th>
                      <th className="py-2 px-4">Question</th>
                      <th className="py-2 px-4">Platform</th>
                      <th className="py-2 px-4">Revision</th>
                      <th className="py-2 px-4">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topicBlock.questions.map((q, qIndex) => {
                      const key = `${topicBlock.topic}-${qIndex}`;
                      return (
                        <tr
                          key={qIndex}
                          className="hover:bg-gray-50 transition-all"
                        >
                          <td className="py-2 px-4">
                            <Checkbox
                              checked={!!completed[key]}
                              onChange={() => handleCheck(topicBlock.topic, qIndex)}
                            />
                          </td>
                          <td className="py-2 px-4 text-blue-600 font-medium">
                            <a href={q.link} target="_blank" rel="noreferrer" className="hover:underline">
                              {q.name}
                            </a>
                          </td>
                          <td className="py-2 px-4">
                            <a href={q.link} target="_blank" rel="noreferrer">
                              <img src={leetcodeLogo} alt="LeetCode" className="w-6 h-6" />
                            </a>
                          </td>
                          <td className="py-2 px-4 text-center">
                            <Repeat2 className="w-5 h-5 text-yellow-500 hover:scale-110 transition" />
                          </td>
                          <td className="py-2 px-4 text-center">
                            <NotebookPen className="w-5 h-5 text-green-500 hover:scale-110 transition" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}

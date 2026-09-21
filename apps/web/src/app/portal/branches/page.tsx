"use client";

import React, { useState } from "react";
import {
  GitFork,
  ChevronRight,
  ChevronDown,
  Building,
  Users,
  ShieldCheck,
  Plus,
  ArrowRightLeft,
  Sparkles,
} from "lucide-react";
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "@org/ui";
import Link from "next/link";

interface BranchItem {
  id: string;
  name: string;
  nameBn: string;
  code: string;
  levelLabel: string;
  depth: number;
  materializedPath: string;
  membersCount: number;
  officers: string[];
  children?: BranchItem[];
}

const INITIAL_TREE: BranchItem[] = [
  {
    id: "node-1",
    name: "Central Executive Secretariat",
    nameBn: "কেন্দ্রীয় কার্যনির্বাহী সচিবালয়",
    code: "CENTRAL",
    levelLabel: "National HQ",
    depth: 0,
    materializedPath: "1",
    membersCount: 3850,
    officers: ["Prof. Dr. Mujibul Haque (President)", "Dr. Faisal Ahmed (GS)"],
    children: [
      {
        id: "node-4",
        name: "Chattogram Metropolitan Division",
        nameBn: "চট্টগ্রাম মহানগর বিভাগ",
        code: "CTG-METRO",
        levelLabel: "Division",
        depth: 1,
        materializedPath: "1/4",
        membersCount: 1420,
        officers: ["Dr. K. M. Jahangir (Branch President)"],
        children: [
          {
            id: "node-12",
            name: "Panchlaish Medical College Unit",
            nameBn: "পাঁচলাইশ মেডিকেল কলেজ ইউনিট",
            code: "PANCHLAISH",
            levelLabel: "Unit Branch",
            depth: 2,
            materializedPath: "1/4/12",
            membersCount: 380,
            officers: ["Dr. Tariqul Islam (Unit Secretary)"],
          },
          {
            id: "node-14",
            name: "Kotwali Central Hospital Unit",
            nameBn: "কোতোয়ালী সেন্ট্রাল হাসপাতাল ইউনিট",
            code: "KOTWALI",
            levelLabel: "Unit Branch",
            depth: 2,
            materializedPath: "1/4/14",
            membersCount: 290,
            officers: ["Dr. Salma Begum (Unit Secretary)"],
          },
        ],
      },
      {
        id: "node-5",
        name: "Dhaka Central Division",
        nameBn: "ঢাকা সেন্ট্রাল বিভাগ",
        code: "DHK-METRO",
        levelLabel: "Division",
        depth: 1,
        materializedPath: "1/5",
        membersCount: 2100,
        officers: ["Prof. Dr. Shamsul Alam (Division President)"],
        children: [
          {
            id: "node-22",
            name: "Dhanmondi Clinical Unit",
            nameBn: "ধানমন্ডি ক্লিনিক্যাল ইউনিট",
            code: "DHANMONDI",
            levelLabel: "Unit Branch",
            depth: 2,
            materializedPath: "1/5/22",
            membersCount: 520,
            officers: ["Dr. Mahbubur Rahman (Unit Secretary)"],
          },
        ],
      },
    ],
  },
];

export default function VisualBranchTreeManagerPage() {
  const [treeData] = useState<BranchItem[]>(INITIAL_TREE);
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});
  const [selectedNode, setSelectedNode] = useState<BranchItem>(INITIAL_TREE[0]!);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCollapse = (id: string) => {
    setCollapsedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTreeNode = (node: BranchItem) => {
    const isCollapsed = !!collapsedNodes[node.id];
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedNode?.id === node.id;

    return (
      <div key={node.id} className="relative select-none">
        {/* Node Row */}
        <div
          onClick={() => setSelectedNode(node)}
          className={`group flex items-center justify-between p-3.5 my-1.5 rounded-xl border transition-all cursor-pointer ${
            isSelected
              ? "bg-primary/15 border-primary shadow-md ring-1 ring-primary/30"
              : "bg-slate-900/50 border-white/10 hover:border-white/20 hover:bg-slate-900/80"
          }`}
          style={{ marginLeft: `${node.depth * 28}px` }}
        >
          <div className="flex items-center gap-3">
            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCollapse(node.id);
                }}
                className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white"
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            ) : (
              <div className="w-6 h-6 flex items-center justify-center text-muted-foreground/40">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              </div>
            )}

            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
              <Building className="w-4 h-4" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">{node.name}</span>
                <span className="text-xs text-muted-foreground font-bangla">({node.nameBn})</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground font-mono">
                <span className="text-amber-400 font-bold">{node.code}</span>
                <span>•</span>
                <span>Path: {node.materializedPath}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">
              {node.levelLabel} (Depth {node.depth})
            </Badge>
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-emerald-400" /> {node.membersCount}
            </span>
          </div>
        </div>

        {/* Recursive Children */}
        {hasChildren && !isCollapsed && (
          <div className="border-l border-white/10 ml-6 pl-1">
            {node.children!.map((child) => renderTreeNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
            <Link href="/" className="hover:text-white">Public Site</Link>
            <span>/</span>
            <span className="text-primary">Governance Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <GitFork className="w-8 h-8 text-primary" />
            Arbitrary-Depth Branch Hierarchy Manager
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Visual tree management powered by MySQL 8.0 Materialized Paths (`materializedPath`) and atomic move transactions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-white">
            <ArrowRightLeft className="w-3.5 h-3.5" /> Move Node Transaction
          </Button>
          <Button size="sm" className="gap-1.5 text-xs font-semibold">
            <Plus className="w-3.5 h-3.5" /> Create Branch Node
          </Button>
        </div>
      </div>

      {/* Main Grid: Tree Visualizer + Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Tree View */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Organizational Tree Structure</CardTitle>
                <CardDescription>
                  Supports unlimited depth levels. Subtrees auto-scope permission boundaries.
                </CardDescription>
              </div>
              <div className="w-64">
                <Input
                  placeholder="Search branch code or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {treeData.map((rootNode) => renderTreeNode(rootNode))}
          </CardContent>
        </Card>

        {/* Right Col: Node Inspector & Scoped Authority */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="text-xs uppercase font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Active Branch Node Details
              </div>
              <CardTitle className="text-lg">{selectedNode.name}</CardTitle>
              <CardDescription className="font-bangla">{selectedNode.nameBn}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950 border border-white/10">
                <div>
                  <div className="text-muted-foreground">Branch Code</div>
                  <div className="font-mono font-bold text-white mt-0.5">{selectedNode.code}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Hierarchy Depth</div>
                  <div className="font-bold text-white mt-0.5">Level {selectedNode.depth}</div>
                </div>
                <div className="col-span-2 border-t border-white/10 pt-2">
                  <div className="text-muted-foreground">Materialized Path</div>
                  <div className="font-mono text-primary mt-0.5 break-all">
                    {selectedNode.materializedPath}
                  </div>
                </div>
              </div>

              <div>
                <div className="font-bold text-white mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Appointed Executive Officers
                </div>
                <ul className="space-y-2">
                  {selectedNode.officers.map((officer, i) => (
                    <li
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 font-medium"
                    >
                      {officer}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-white/10">
                <div className="text-[11px] text-muted-foreground">
                  Officers assigned to this node automatically inherit management authority over this node and all its child sub-branches.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Building2,
  ChevronRight,
  ChevronDown,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  GitBranch,
} from "lucide-react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  PageHeader,
  EmptyState,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@org/ui";
import { apiClient } from "@/lib/api-client";

interface BranchTreeNode {
  id: string;
  name: string;
  nameBn?: string;
  code?: string;
  levelLabel: string;
  depth: number;
  materializedPath: string;
  address?: string;
  contactPhone?: string;
  children?: BranchTreeNode[];
}

export default function BranchNetworkPage() {
  const [tree, setTree] = useState<BranchTreeNode[]>([]);
  const [flatBranches, setFlatBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

  // Create Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [parentId, setParentId] = useState<string>("");
  const [name, setName] = useState("");
  const [nameBn, setNameBn] = useState("");
  const [code, setCode] = useState("");
  const [levelLabel, setLevelLabel] = useState("District Branch");
  const [address, setAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const loadHierarchy = useCallback(async () => {
    setLoading(true);
    try {
      const [treeRes, listRes] = await Promise.allSettled([
        apiClient.hierarchy.getTree(),
        apiClient.hierarchy.list(),
      ]);

      if (treeRes.status === "fulfilled") {
        const rawTree = Array.isArray(treeRes.value) ? treeRes.value : [treeRes.value];
        setTree(rawTree);
        // Expand root nodes by default
        const initExpanded: Record<string, boolean> = {};
        rawTree.forEach((n: any) => {
          if (n?.id) initExpanded[n.id] = true;
        });
        setExpandedNodes(initExpanded);
      }

      if (listRes.status === "fulfilled") {
        setFlatBranches(listRes.value || []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHierarchy();
  }, [loadHierarchy]);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const handleCreateBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setFeedback(null);

    try {
      await apiClient.hierarchy.create({
        parentId: parentId || undefined,
        name: name.trim(),
        nameBn: nameBn.trim() || undefined,
        code: code.trim() || undefined,
        levelLabel,
        address: address.trim() || undefined,
        contactPhone: contactPhone.trim() || undefined,
      });

      setFeedback({ type: "success", msg: "Branch node created with materialized path bound." });
      setCreateModalOpen(false);
      setName("");
      setNameBn("");
      setCode("");
      setAddress("");
      setContactPhone("");
      await loadHierarchy();
    } catch (err: any) {
      setFeedback({ type: "error", msg: err.message || "Failed to create branch node." });
    } finally {
      setActionLoading(false);
    }
  };

  const renderNode = (node: BranchTreeNode) => {
    const isExpanded = !!expandedNodes[node.id];
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="space-y-1">
        <div
          className={`flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-xs ${
            node.depth === 0 ? "border-primary/40 bg-primary/5" : ""
          }`}
          style={{ marginLeft: `${node.depth * 24}px` }}
        >
          <div className="flex items-center gap-2.5">
            {hasChildren ? (
              <button
                type="button"
                onClick={() => toggleNode(node.id)}
                className="p-1 rounded text-muted-foreground hover:text-foreground"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            ) : (
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground text-sm">
                  {node.name}
                </span>
                {node.nameBn && (
                  <span className="text-xs text-muted-foreground font-bangla">
                    ({node.nameBn})
                  </span>
                )}
                <Badge variant="secondary" size="sm">
                  {node.levelLabel}
                </Badge>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-mono mt-0.5">
                <span>Path: {node.materializedPath}</span>
                <span>Depth: {node.depth}</span>
                {node.code && <span>Code: {node.code}</span>}
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setParentId(node.id);
              setCreateModalOpen(true);
            }}
            className="text-[11px] text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Child Node
          </Button>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {node.children!.map((child) => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Branch Hierarchy & Materialized Path Explorer"
        titleBn="শাখা পরিষদ কাঠামো ও পদক্রম"
        description="Inspect the unlimited-depth organizational tree. Scopes and executive authorities inherit down the materialized path tree."
        badge={
          <Badge variant="outline" className="font-mono">
            {flatBranches.length} Active Nodes
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadHierarchy}
              leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
            >
              Refresh
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setParentId("");
                setCreateModalOpen(true);
              }}
              leftIcon={<Plus className="h-3.5 w-3.5" />}
            >
              Add Root Node
            </Button>
          </div>
        }
      />

      {feedback && (
        <div
          className={`p-3 rounded-md text-xs flex items-center gap-2 ${
            feedback.type === "success"
              ? "bg-emerald-950/40 border border-emerald-800 text-emerald-300"
              : "bg-red-950/40 border border-red-800 text-red-300"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          )}
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Tree View Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              Organizational Tree Viewer
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5 font-bangla">
              শাখা ও ইউনিটের পদক্রম এবং অধস্তন কমিটির তালিকা
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          {loading ? (
            <div className="p-8 text-center text-xs text-muted-foreground animate-pulse">
              Loading materialized path branch tree...
            </div>
          ) : tree.length === 0 ? (
            <EmptyState
              icon={<Building2 className="h-8 w-8 text-muted-foreground" />}
              title="No Branch Hierarchy"
              titleBn="কোনো শাখা পাওয়া যায়নি"
              description="Create a root headquarters node to start building the organization tree."
            />
          ) : (
            <div className="space-y-1">{tree.map((node) => renderNode(node))}</div>
          )}
        </CardContent>
      </Card>

      {/* Modal: Create Branch Node */}
      {createModalOpen && (
        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Organizational Branch Node</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreateBranch} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Parent Node</label>
                <select
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                >
                  <option value="">None (Root Node - Depth 0)</option>
                  {flatBranches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.levelLabel}) - Path: {b.materializedPath}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Node Name (English)</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Chattogram Medical College Hospital Unit"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">নাম (বাংলা)</label>
                <input
                  type="text"
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  placeholder="e.g. চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল ইউনিট"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background font-bangla"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Branch Code</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="CMCH-UNIT"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Level Label</label>
                  <select
                    value={levelLabel}
                    onChange={(e) => setLevelLabel(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                  >
                    <option value="National HQ">National HQ</option>
                    <option value="Division">Division</option>
                    <option value="District Branch">District Branch</option>
                    <option value="Upazila / Unit">Upazila / Unit</option>
                    <option value="Hospital Unit">Hospital Unit</option>
                    <option value="Specialized Committee">Specialized Committee</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Physical Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street or medical campus address..."
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCreateModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" loading={actionLoading}>
                  Create Node
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

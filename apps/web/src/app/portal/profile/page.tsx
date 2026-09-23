import React, { useState } from "react";
import {
  Save,
  CheckCircle2,
} from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, PageHeader } from "@org/ui";

export default function MemberProfilePage() {
  const [saved, setSaved] = useState(false);
  const [fullName, setFullName] = useState("Tanvir Rahman");
  const [fullNameBn, setFullNameBn] = useState("তানভীর তানভীর");
  const [phone, setPhone] = useState("+880 1819 778899");
  const [email, setEmail] = useState("convener@roadsafetymovement.org");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [occupation, setOccupation] = useState("Transport Safety Systems Specialist");
  const [address, setAddress] = useState("Farmgate, Dhaka, Bangladesh");

  // Privacy Levels
  const [phonePrivacy, setPhonePrivacy] = useState("MEMBERS_ONLY");
  const [emailPrivacy, setEmailPrivacy] = useState("MEMBERS_ONLY");
  const [addressPrivacy, setAddressPrivacy] = useState("EXECUTIVE_ONLY");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Member Dossier & KYC Record"
        titleBn="সদস্য প্রোফাইল ও কেওয়াইসি তথ্য"
        description="Manage your institutional identity, verified credentials, emergency contact details, and 3-tier privacy masking."
        badge={
          <Badge variant="outline" className="text-xs font-mono text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
            KYC Level 3 Verified
          </Badge>
        }
      />

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Personal Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Personal & Demographic Record</CardTitle>
            <p className="text-xs text-muted-foreground font-bangla">
              জাতীয় পরিচয়পত্র ও সাংগঠনিক সনদ অনুযায়ী তথ্যাবলী
            </p>
          </CardHeader>

          <CardContent className="space-y-4 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-muted-foreground">
                  Full Name (English)
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-muted-foreground">
                  পূর্ণ নাম (বাংলায়)
                </label>
                <input
                  type="text"
                  required
                  value={fullNameBn}
                  onChange={(e) => setFullNameBn(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:border-primary font-bangla"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-muted-foreground">
                  Blood Group (জরুরি প্রয়োজনে)
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-muted-foreground">
                  Profession / Occupation
                </label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & 3-Tier Privacy Controls */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Contact & Three-Tier Privacy Masking</CardTitle>
            <p className="text-xs text-muted-foreground font-bangla">
              আপনার যোগাযোগ তথ্যের দৃশ্যমানতার পরিধি নির্ধারণ করুন (পাবলিক / শুধু সদস্য / শুধু নির্বাহী)
            </p>
          </CardHeader>

          <CardContent className="space-y-4 pt-0">
            {/* Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center p-3 rounded-xl bg-muted/40 border border-border">
              <div className="sm:col-span-2 space-y-1">
                <span className="text-xs font-mono uppercase text-muted-foreground">Mobile Phone</span>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-2.5 py-1 rounded border border-input bg-background text-sm font-semibold font-mono text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground block mb-1">Privacy Level</label>
                <select
                  value={phonePrivacy}
                  onChange={(e) => setPhonePrivacy(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-lg border border-input bg-background text-xs font-mono"
                >
                  <option value="PUBLIC">PUBLIC</option>
                  <option value="MEMBERS_ONLY">MEMBERS_ONLY</option>
                  <option value="EXECUTIVE_ONLY">EXECUTIVE_ONLY</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center p-3 rounded-xl bg-muted/40 border border-border">
              <div className="sm:col-span-2 space-y-1">
                <span className="text-xs font-mono uppercase text-muted-foreground">Official Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2.5 py-1 rounded border border-input bg-background text-sm font-semibold font-mono text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground block mb-1">Privacy Level</label>
                <select
                  value={emailPrivacy}
                  onChange={(e) => setEmailPrivacy(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-lg border border-input bg-background text-xs font-mono"
                >
                  <option value="PUBLIC">PUBLIC</option>
                  <option value="MEMBERS_ONLY">MEMBERS_ONLY</option>
                  <option value="EXECUTIVE_ONLY">EXECUTIVE_ONLY</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center p-3 rounded-xl bg-muted/40 border border-border">
              <div className="sm:col-span-2 space-y-1">
                <span className="text-xs font-mono uppercase text-muted-foreground">Permanent Address</span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-2.5 py-1 rounded border border-input bg-background text-sm font-semibold text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground block mb-1">Privacy Level</label>
                <select
                  value={addressPrivacy}
                  onChange={(e) => setAddressPrivacy(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-lg border border-input bg-background text-xs font-mono"
                >
                  <option value="PUBLIC">PUBLIC</option>
                  <option value="MEMBERS_ONLY">MEMBERS_ONLY</option>
                  <option value="EXECUTIVE_ONLY">EXECUTIVE_ONLY</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Submission Bar */}
        <div className="flex items-center justify-between pt-2">
          {saved && (
            <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 font-mono">
              <CheckCircle2 className="h-4 w-4" />
              <span>Profile Dossier & Privacy Controls Successfully Updated.</span>
            </div>
          )}

          <div className="ml-auto">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="bg-[#164e32] hover:bg-[#113d27] text-white"
              leftIcon={<Save className="h-4 w-4" />}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

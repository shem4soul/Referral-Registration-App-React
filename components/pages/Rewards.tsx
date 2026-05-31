import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Rewards = () => {
  return (
    <div>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Rewards</h2>

        <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Your Reward Points</CardTitle>
            <CardDescription className="text-white/80">
              Earn points by engaging with your community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-4">2,450 pts</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                <div className="text-sm opacity-90">This Month</div>
                <div className="text-xl font-bold">+340 pts</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                <div className="text-sm opacity-90">Rank</div>
                <div className="text-xl font-bold">#42</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rewards;

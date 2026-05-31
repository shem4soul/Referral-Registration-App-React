import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Briefcase, Building2, Calendar, MapPin } from "lucide-react";
import { initialEvents, initialJobs, initialProperties } from "@/lib/helper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

const Market = () => {
  return (
    <div>
      <div className="space-y-6">
        <div className="text flex items-center justify-between">

        <h2 className="text-3xl font-bold">Marketplace</h2>
        <Link href="/n/markets/create-product">
          <Button className="bg-blue-500 hover:bg-blue-600" >Create Product</Button>
        </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full sm:w-auto grid grid-cols-5 sm:flex">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="rent">Rent</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6 space-y-6">
            {/* Events Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Events
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {initialEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="text-base line-clamp-2">
                        {event.name}
                      </CardTitle>
                      <CardDescription>{event.organizer}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {event.location}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="font-semibold">{event.price}</span>
                        <Button size="sm">Get Ticket</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Jobs Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Jobs
              </h3>
              <div className="space-y-3">
                {initialJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">
                            {job.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {job.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                            <Badge variant="secondary">{job.type}</Badge>
                          </div>
                          <div className="mt-2 font-semibold text-primary">
                            {job.salary}
                          </div>
                        </div>
                        <Button>Apply</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Properties Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Properties for Rent
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {initialProperties.map((property) => (
                  <Card
                    key={property.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="text-6xl text-center py-4">
                        {property.image}
                      </div>
                      <CardTitle className="text-base">
                        {property.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {property.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">
                          {property.price}
                        </span>
                        <Button size="sm">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Market;

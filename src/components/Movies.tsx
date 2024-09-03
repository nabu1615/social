"use client";

import React from "react";
import { useQuery } from "react-query";
import { getTvShowList } from "@/utils/movies_api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  movie: z.string(),
});

export const Movies = () => {
  // @ts-ignore
  const resolver = new zodResolver(formSchema);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: resolver,
  });
  const [movie, setMovie] = React.useState("");

  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getTvShowList(movie),
    queryKey: ["movies"],
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setMovie(data.movie);

    refetch();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="movie"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Movie</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="movie"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button variant="default" type="submit">
            Buscar
          </Button>
        </form>
      </Form>
      {data && (
        <div>
          {data.results.map((movie: any) => (
            <div key={movie.id}>
              <p>{movie.name}</p>
              <img
                src={
                  "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" +
                  movie.poster_path
                }
                alt=""
                width={200}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

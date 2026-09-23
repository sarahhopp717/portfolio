<script lang="ts">
  import { Router, type Route } from "@mateothegreat/svelte5-router";
  import Home from "./pages/Home.svelte";
  import Pivot from "./pages/Pivot.svelte";
  import Photos from "./pages/Photos.svelte";
  import Experience from "./pages/Experience.svelte";
  import Bands from "./pages/Bands.svelte";
  import Connect from "./pages/Connect.svelte";
  import Hobbies from "./pages/Hobbies.svelte";
  import NavBar from "./components/NavBar.svelte";

  const routes: Route[] = [
    { path: "/", component: Home },
    { path: "/pivot", component: Pivot },
    { path: "/photos", component: Photos },
    { path: "/experience", component: Experience },
    { path: "/bands", component: Bands },
    { path: "/connect", component: Connect },
    { path: "/hobbies", component: Hobbies },
  ];
</script>

<NavBar />
<Router {routes} />
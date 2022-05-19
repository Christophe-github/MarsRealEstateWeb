import { Store } from 'vuex';// path to store file
import { MarsState } from "./store";

declare module '@vue/runtime-core' {

  interface ComponentCustomProperties {
    $store: Store<MarsState>;
  }
}
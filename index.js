import axios from "axios";

// CONSTS
const baseURL = `https://api.ms.innoventures.com.br/public/v2.0`;
const TESTE_AUTOMATICO = "Teste Automático";
const TESTE_AUTOMATICO_UPDATED = "Teste Automático ATUALIZADO";
const TESTE_AUTOMATICO_UPDATED_WITH_METAS =
  "Teste Automático ATUALIZADO com metas";

// Routes
const GET_SESSION_TOKEN = `/getSessionToken/1ca7bad9fde60a7544385f87c91945bf2a8e093f30791fc33cdc99d65e67fe87`;
const CREATE_STORE = `/store/createStore`;
const GET_STORE = (by, key) => `/store/getStoreBy/${by}/${key}`;
const UPDATE_STORE = (id) => `/store/updateStore/${id}`;

// Vars
let sessionToken = "";
let now = Date.now();
let storeId = "";
let storeSlug = "";
let metas = {
  phone1: "phone1",
  phone2: "phone2",
  url: "url",
  cashbackRate: 0.99,
};

const api = axios.create({
  baseURL,
});

const getStoreByIdUpdatedWithParams = () => {
  api
    .get(GET_STORE("id", storeId), {
      headers: {
        sessionToken,
      },
    })
    .then(({ data: { data } }) => {
      if (data.term_id !== storeId) {
        console.log(
          "getStoreByIdUpdatedWithParams - Deveria ter retornado o id correto " +
            storeId
        );
      }
      if (data.slug !== storeSlug) {
        console.log(
          "getStoreByIdUpdatedWithParams - Deveria ter retornado o slug correto " +
            storeSlug
        );
      }
      if (
        !data.description ||
        data.description !== TESTE_AUTOMATICO_UPDATED_WITH_METAS
      ) {
        console.log(
          "getStoreByIdUpdatedWithParams - Deveria ter retornado o description correto " +
            TESTE_AUTOMATICO_UPDATED_WITH_METAS
        );
      }

      if (data.metas?.phone1 !== metas.phone1) {
        console.log(
          "getStoreByIdUpdatedWithParams - Deveria ter retornado o phone1 correto " +
            metas.phone1
        );
      }
      if (data.metas?.phone2 !== metas.phone2) {
        console.log(
          "getStoreByIdUpdatedWithParams - Deveria ter retornado o phone2 correto " +
            metas.phone2
        );
      }
      if (data.metas?.url !== metas.url) {
        console.log(
          "getStoreByIdUpdatedWithParams - Deveria ter retornado o url correto " +
            metas.url
        );
      }
      if (data.metas?.cashbackRate !== metas.cashbackRate) {
        console.log(
          "getStoreByIdUpdatedWithParams - Deveria ter retornado o cashbackRate correto " +
            metas.cashbackRate
        );
      }
    })
    .catch(({ response: { data } }) => {
      console.log(
        "getStoreByIdUpdatedWithParams - Deveria ter voltado a store " + storeId
      );
    })
    .finally(() => {});
};

const updateStoreWithMetasOK = () => {
  now = Date.now();
  api
    .post(
      UPDATE_STORE(storeId),
      {
        name: TESTE_AUTOMATICO_UPDATED_WITH_METAS,
        slug: TESTE_AUTOMATICO_UPDATED_WITH_METAS + now,
        description: TESTE_AUTOMATICO_UPDATED_WITH_METAS,
        metas,
      },
      {
        headers: {
          sessionToken,
        },
      }
    )
    .then(({ data: { data } }) => {
      if (storeId !== data.term_id) {
        console.log(
          "updateStoreWithMetasOK - Deveria ter retornado o id do store " +
            storeId
        );
      }
      if (TESTE_AUTOMATICO_UPDATED_WITH_METAS !== data.description) {
        console.log(
          "updateStoreWithMetasOK - Deveria ter retornado o description do store " +
            TESTE_AUTOMATICO_UPDATED_WITH_METAS
        );
      }
      if (TESTE_AUTOMATICO_UPDATED_WITH_METAS !== data.name) {
        console.log(
          "updateStoreWithMetasOK - Deveria ter retornado o name do store " +
            TESTE_AUTOMATICO_UPDATED_WITH_METAS
        );
      }
      storeSlug = data.slug;
    })
    .catch(({ response: { data } }) => {
      console.log(
        "updateStoreWithMetasOK - Deveria ter criado a store com sucesso"
      );
    })
    .finally(() => {
      getStoreByIdUpdatedWithParams();
    });
};

const getStoreByIdUpdated = () => {
  api
    .get(GET_STORE("id", storeId), {
      headers: {
        sessionToken,
      },
    })
    .then(({ data: { data } }) => {
      if (data.term_id !== storeId) {
        console.log(
          "getStoreByIdUpdated - Deveria ter retornado o id correto " + storeId
        );
      }
      if (data.slug !== storeSlug) {
        console.log(
          "getStoreByIdUpdated - Deveria ter retornado o slug correto " +
            storeSlug
        );
      }
      if (!data.description || data.description !== TESTE_AUTOMATICO_UPDATED) {
        console.log(
          "getStoreByIdUpdated - Deveria ter retornado o description correto " +
            TESTE_AUTOMATICO_UPDATED
        );
      }
    })
    .catch(({ response: { data } }) => {
      console.log(
        "getStoreByIdUpdated - Deveria ter voltado a store " + storeId
      );
    })
    .finally(() => {
      updateStoreWithMetasOK();
    });
};

const updateStoreOK = () => {
  now = Date.now();
  api
    .post(
      UPDATE_STORE(storeId),
      {
        name: TESTE_AUTOMATICO_UPDATED,
        slug: TESTE_AUTOMATICO_UPDATED + now,
        description: TESTE_AUTOMATICO_UPDATED,
      },
      {
        headers: {
          sessionToken,
        },
      }
    )
    .then(({ data: { data } }) => {
      if (storeId !== data.term_id) {
        console.log(
          "updateStoreOK - Deveria ter retornado o id do store " + storeId
        );
      }
      if (TESTE_AUTOMATICO_UPDATED !== data.description) {
        console.log(
          "updateStoreOK - Deveria ter retornado o description do store " +
            TESTE_AUTOMATICO_UPDATED
        );
      }
      if (TESTE_AUTOMATICO_UPDATED !== data.name) {
        console.log(
          "updateStoreOK - Deveria ter retornado o name do store " +
            TESTE_AUTOMATICO_UPDATED
        );
      }
      storeSlug = data.slug;
    })
    .catch(({ response: { data } }) => {
      console.log("updateStoreOK - Deveria ter criado a store com sucesso");
    })
    .finally(() => {
      getStoreByIdUpdated();
    });
};

const updateStoreWithouParams = () => {
  now = Date.now();
  api
    .post(
      UPDATE_STORE(storeId),
      {},
      {
        headers: {
          sessionToken,
        },
      }
    )
    .then(() => {
      console.log(
        "updateStoreWithouParams - Deveria ter dado erro de parametros"
      );
    })
    .catch(({ response: { data } }) => {
      if (!data.errors?.description) {
        console.log(
          "updateStoreWithouParams - Deveria ter dado erro de description"
        );
      }
      if (!data.errors?.slug) {
        console.log("updateStoreWithouParams - Deveria ter dado erro de slug");
      }
      if (!data.errors?.name) {
        console.log("updateStoreWithouParams - Deveria ter dado erro de name");
      }
    })
    .finally(() => {
      updateStoreOK();
    });
};

const updateStoreUnlogged = () => {
  now = Date.now();
  api
    .post(UPDATE_STORE(storeId), {
      name: TESTE_AUTOMATICO_UPDATED,
      slug: TESTE_AUTOMATICO_UPDATED + now,
      description: TESTE_AUTOMATICO_UPDATED,
    })
    .then(() => {
      console.log("updateStoreUnlogged - Deveria ter bloqueado o acesso");
    })
    .catch(({ response }) => {
      // precisa colocar tratativa de se voltou o erro certo ou não
      if (!response.data?.message) {
        console.log("updateStoreUnlogged - Deveria ter message", response.data);
      }
    })
    .finally(() => {
      updateStoreWithouParams();
    });
};

const getStoreBySlugFail = () => {
  api
    .get(GET_STORE("slug", now + "batata" + now), {
      headers: {
        sessionToken,
      },
    })
    .then(({ data: { data } }) => {
      console.log(
        "getStoreBySlugFail - Deveria não ter retornado store para o id " +
          storeId
      );
    })
    .catch(({ response: { data } }) => {
      if (data.message === `store not found`) {
        console.log(
          "getStoreBySlugFail - Mensagem de erro deveria estar em português"
        );
      }
    })
    .finally(() => {
      updateStoreUnlogged();
    });
};

const getStoreByIdFail = () => {
  api
    .get(GET_STORE("id", now), {
      headers: {
        sessionToken,
      },
    })
    .then(({ data: { data } }) => {
      console.log(
        "getStoreByIdFail - Deveria não ter retornado store para o id " +
          storeId
      );
    })
    .catch(({ response: { data } }) => {
      if (data.message === `store not found`) {
        console.log(
          "getStoreByIdFail - Mensagem de erro deveria estar em português"
        );
      }
    })
    .finally(() => {
      getStoreBySlugFail();
    });
};

const getStoreBySlug = () => {
  api
    .get(GET_STORE("id", storeId), {
      headers: {
        sessionToken,
      },
    })
    .then(({ data: { data } }) => {
      if (data.term_id !== storeId) {
        console.log(
          "getStoreBySlug - Deveria ter retornado o id correto " + storeId
        );
      }
      if (data.slug !== storeSlug) {
        console.log(
          "getStoreBySlug - Deveria ter retornado o slug correto " + storeSlug
        );
      }
      if (!data.description || data.description !== TESTE_AUTOMATICO) {
        console.log(
          "getStoreBySlug - Deveria ter retornado o description correto " +
            TESTE_AUTOMATICO
        );
      }
    })
    .catch(({ response: { data } }) => {
      console.log("getStoreBySlug - Deveria ter voltado a store " + storeId);
    })
    .finally(() => {
      getStoreByIdFail();
    });
};

const getStoreById = () => {
  api
    .get(GET_STORE("id", storeId), {
      headers: {
        sessionToken,
      },
    })
    .then(({ data: { data } }) => {
      if (data.term_id !== storeId) {
        console.log(
          "getStoreById - Deveria ter retornado o id correto " + storeId
        );
      }
      if (data.slug !== storeSlug) {
        console.log(
          "getStoreById - Deveria ter retornado o slug correto " + storeSlug
        );
      }
      if (!data.description || data.description !== TESTE_AUTOMATICO) {
        console.log(
          "getStoreById - Deveria ter retornado o description correto " +
            TESTE_AUTOMATICO
        );
      }
    })
    .catch(({ response: { data } }) => {
      console.log("getStoreById - Deveria ter voltado a store " + storeId);
    })
    .finally(() => {
      getStoreBySlug();
    });
};

const createStoreDuplicated = () => {
  api
    .post(
      CREATE_STORE,
      {
        name: TESTE_AUTOMATICO,
        slug: TESTE_AUTOMATICO + now,
        description: TESTE_AUTOMATICO,
      },
      {
        headers: {
          sessionToken,
        },
      }
    )
    .then(() => {
      console.log(
        "createStoreDuplicated - Deveria ter aviso que slug já existe"
      );
    })
    .catch(({ response: { data } }) => {
      if (data.retcode !== 98) {
        console.log("createStoreDuplicated - Deveria ter voltado retcode 98");
      }
    })
    .finally(() => {
      getStoreById();
    });
};

const createStoreOk = () => {
  now = Date.now();
  api
    .post(
      CREATE_STORE,
      {
        name: TESTE_AUTOMATICO,
        slug: TESTE_AUTOMATICO + now,
        description: TESTE_AUTOMATICO,
      },
      {
        headers: {
          sessionToken,
        },
      }
    )
    .then(({ data: { data } }) => {
      storeId = data.term_id;
      storeSlug = data.slug;
    })
    .catch(({ response: { data } }) => {
      console.log("createStoreOk - Deveria ter criado a store com sucesso");
    })
    .finally(() => {
      createStoreDuplicated();
    });
};

const createStoreWithOutParams = () => {
  api
    .post(
      CREATE_STORE,
      {},
      {
        headers: {
          sessionToken,
        },
      }
    )
    .then(() => {
      console.log(
        "createStoreWithOutParams - Deveria ter dado erro de description"
      );
    })
    .catch(({ response: { data } }) => {
      if (!data.errors?.description) {
        console.log(
          "createStoreWithOutParams - Deveria ter dado erro de description"
        );
      }
      if (!data.errors?.slug) {
        console.log("createStoreWithOutParams - Deveria ter dado erro de slug");
      }
      if (!data.errors?.name) {
        console.log("createStoreWithOutParams - Deveria ter dado erro de name");
      }
    })
    .finally(() => {
      createStoreOk();
    });
};

const createStoreUnlogged = () => {
  now = Date.now();
  api
    .post(CREATE_STORE, {
      name: TESTE_AUTOMATICO,
      slug: TESTE_AUTOMATICO + now,
      description: TESTE_AUTOMATICO,
    })
    .then(() => {
      console.log("createStoreUnlogged - Deveria ter bloqueado o acesso");
    })
    .catch(({ response }) => {
      // precisa colocar tratativa de se voltou o erro certo ou não
      if (!response.data?.message) {
        console.log("createStoreUnlogged - Deveria ter message", response.data);
      }
    })
    .finally(() => {
      createStoreWithOutParams();
    });
};

const getSessionToken = () => {
  api
    .get(GET_SESSION_TOKEN)
    .then(({ data: { data } }) => {
      sessionToken = data;
    })
    .then(() => {
      createStoreUnlogged();
    })
    .catch(() => {
      console.log("falhou em pegar Session Token");
    });
};

getSessionToken();

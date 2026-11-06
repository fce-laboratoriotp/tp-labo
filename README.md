# Mortalidad por suicidios en Argentina (2020-2024)

Trabajo Práctico Grupal de **Laboratorio de Métodos Cuantitativos Aplicados a la Gestión**.

## Descripción del proyecto

Este proyecto analiza la evolución y distribución de los casos de suicidio en Argentina durante el período 2020-2024, utilizando bases de datos oficiales del Sistema Nacional de Información Criminal (SNIC).

El objetivo es estudiar la evolución temporal de los casos, identificar los grupos etarios con mayor concentración de víctimas y analizar las diferencias entre varones y mujeres, considerando también la distribución territorial del fenómeno.

## Acceso al proyecto

- 📊 **Informe final:** [Informe de análisis de suicidios 2020-2024 (PDF)](./Informe_suicidios_2020_2024.pdf)
- 💻 **Notebook en Google Colab:** [Abrir notebook](https://colab.research.google.com/github/fce-laboratoriotp/tp-labo/blob/main/An%C3%A1lisisSuicidios2020-2024.ipynb)
- 🌐 **Presentación web:** [Ver presentación](https://fce-laboratoriotp.github.io/tp-labo/)

## Objetivo general

Analizar la evolución y distribución de los casos de suicidio en Argentina entre 2020 y 2024 según la edad y el sexo, para entender cómo varía la brecha entre varones y mujeres en las distintas etapas de la vida e identificar cuáles son los grupos más vulnerables sobre los que hay que priorizar la prevención.

## Fuentes de datos

Se utilizaron bases de datos oficiales abiertas de la Dirección Nacional de Estadística Criminal (DNEC), dependiente del Ministerio de Seguridad de la Nación.

- **SNIC Provincias:** información agregada por provincia y año, utilizada para analizar cantidades y tasas.
- **SNIC Microdatos:** registros individuales que permiten estudiar variables demográficas como edad y sexo.

Fuente: [Argentina.gob.ar – Bases de datos del SNIC](https://www.argentina.gob.ar/seguridad/estadisticascriminales/bases-de-datos).

## Tecnologías y herramientas

- Python
- Google Colab
- Pandas
- Matplotlib
- NumPy

## Metodología

El procesamiento y análisis de los datos se organizó en las siguientes etapas:

1. **Carga y exploración:** incorporación de las fuentes oficiales, revisión de estructuras, dimensiones y variables.
2. **Limpieza:** auditoría de valores nulos, duplicados y calidad de los datos.
3. **Integración:** agrupación de microdatos y cruce con la base provincial mediante `groupby()` y `pd.merge()`.
4. **Validación:** comprobación de consistencia entre ambas fuentes y construcción del dataset maestro.
5. **Análisis estadístico:** estudio de la evolución anual, distribución por edad, diferencias por sexo y participación provincial.
6. **Visualización:** elaboración de gráficos comparativos e interpretación de resultados.

## Principales resultados

Durante el período analizado se registraron **19.323 víctimas** en Argentina.

Entre los principales hallazgos se destacan:

- La cantidad anual de víctimas pasó de 3.262 en 2020 a 4.249 en 2024.
- Se observa una marcada concentración de casos en población joven, especialmente entre los 15 y 34 años.
- Aproximadamente el 79% de los registros corresponden a varones y el 20% a mujeres.
- Se mantiene una relación aproximada de cuatro víctimas varones por cada mujer.
- El análisis provincial muestra diferencias territoriales en las tasas de mortalidad, considerando la población de cada jurisdicción.

## Estructura del repositorio

```text
tp-labo/
├── docs/                          # Presentación web
├── AnálisisSuicidios2020-2024.ipynb  # Notebook de análisis
├── Informe_suicidios_2020_2024.pdf   # Informe final
├── SAT-SS-BU_2017-2024.csv          # Base de microdatos
├── dataset_unificado.xlsx           # Dataset unificado
├── snic-provincias.csv              # Base provincial
└── README.md                        # Documentación del proyecto
```

## Integrantes

| Nombre y apellido | Registro | GitHub |
|---|---:|---|
| Miguelina Baldi | 920085 | [@baldimiguelina](https://github.com/baldimiguelina) |
| Micaela Cabrera | 921458 | [@Cabrera30micaela](https://github.com/Cabrera30micaela) |
| Kayra Estrella | 921472 | [@kayraa2003](https://github.com/kayraa2003) |
| Aldana Montenegro | 921489 | [@AldanaMontenegro](https://github.com/AldanaMontenegro) |
| Florencia Scavone | 921420 | [@scavonemf](https://github.com/scavonemf) |

---

**Universidad de Buenos Aires (UBA)**  
Trabajo Práctico Grupal – Laboratorio de Métodos Cuantitativos Aplicados a la Gestión.


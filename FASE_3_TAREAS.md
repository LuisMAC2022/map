# Fase 3 · validación y tareas de cierre

## Objetivo

Demostrar, como mínimo, un ciclo completo del MVP y una consecuencia visible de separar o contaminar el PET. Para declarar validada la fase, además debe existir evidencia de aprendizaje y una prueba acotada de transferencia al campus.

## Veredicto actual

El objetivo mínimo funcional está cumplido:

- El mapa abre una instancia del simulador para cada contenedor PET.
- El recorrido permite generar o esperar, recolectar, procesar y vender una botella.
- El estado del material, las restricciones de orden y las penalizaciones de precio muestran consecuencias visibles.

La fase sigue abierta como validación: faltan datos pre/post, telemetría del recorrido, calibración local y medición física en campus.

## Lista de tareas

| Prioridad | Estado | Tarea | Evidencia de aceptación |
| --- | --- | --- | --- |
| P0 | [x] | Vincular evidencia → mapa → simulador y permitir el regreso. | Las tres páginas muestran el mismo recorrido; cada enlace resuelve sin error. |
| P0 | [x] | Permitir un ciclo completo por contenedor. | Se puede generar o esperar, recolectar, acondicionar y vender una botella. |
| P0 | [x] | Mostrar una consecuencia por contaminación o mal acondicionamiento. | Cambian las etiquetas, los bloqueos explicativos y el precio mostrado. |
| P0 | [ ] | Automatizar la prueba de aceptación del recorrido. | Una prueba reproduce una ruta limpia y una contaminada, verifica resultados y vuelve al mapa. |
| P0 | [ ] | Instrumentar el MVP. | Se registran inicio, contenedor, acciones, errores, omisiones, tiempo, precio y finalización sin datos personales innecesarios. |
| P0 | [ ] | Añadir medición de comprensión pre/post. | El instrumento mide cadena de valor, generado/recuperado/útil y efectos de contaminación; existe una regla de mejora esperada. |
| P1 | [ ] | Calibrar precios, descuentos y rechazos. | Cada regla del simulador cita comprador o gestor, fecha, unidad, alcance y vigencia; los valores demostrativos quedan identificados. |
| P1 | [ ] | Verificar todas las instancias y accesibilidad. | Todos los contenedores abren la instancia correcta; el recorrido funciona con teclado, lector de pantalla y viewport móvil. |
| P1 | [ ] | Ejecutar el piloto en campus. | Hay línea base de masa, rechazo y contaminación, periodo de intervención y zona o periodo de comparación. |
| P1 | [ ] | Aplicar una regla de decisión predefinida. | Antes del piloto se fijan umbrales para iterar, escalar o detener; después se publica el resultado con sus límites. |

## Definición de fase cerrada

La fase 3 se considera cerrada cuando:

1. La prueba funcional y de accesibilidad pasa en las tres páginas.
2. La ruta limpia y la contaminada producen consecuencias distintas y documentadas.
3. Las reglas económicas están calibradas o rotuladas inequívocamente como demostrativas.
4. Existe mejora pre/post conforme al umbral definido antes del piloto.
5. La medición física posterior se compara con su línea base sin atribuir causalidad más allá del diseño usado.
6. La decisión de iterar, escalar o detener queda registrada junto con la evidencia.

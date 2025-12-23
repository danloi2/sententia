-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mariadb2
-- Tiempo de generación: 07-12-2025 a las 23:51:09
-- Versión del servidor: 12.1.2-MariaDB-ubu2404
-- Versión de PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `esaldi`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores`
--

CREATE TABLE `autores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `nacimiento_ano` int(11) DEFAULT NULL,
  `nacimiento_mes` tinyint(4) DEFAULT NULL,
  `nacimiento_dia` tinyint(4) DEFAULT NULL,
  `nacimiento_str` varchar(20) DEFAULT NULL,
  `fallecimiento_ano` int(11) DEFAULT NULL,
  `fallecimiento_mes` tinyint(4) DEFAULT NULL,
  `fallecimiento_dia` tinyint(4) DEFAULT NULL,
  `fallecimiento_str` varchar(20) DEFAULT NULL,
  `biografia` text DEFAULT NULL,
  `nombre_la` varchar(255) NOT NULL,
  `epoca_id` int(11) DEFAULT NULL,
  `nacion_id` int(11) DEFAULT NULL,
  `biografia_la` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `autores`
--

INSERT INTO `autores` (`id`, `nombre`, `nacimiento_ano`, `nacimiento_mes`, `nacimiento_dia`, `nacimiento_str`, `fallecimiento_ano`, `fallecimiento_mes`, `fallecimiento_dia`, `fallecimiento_str`, `biografia`, `nombre_la`, `epoca_id`, `nacion_id`, `biografia_la`) VALUES
(14, 'Horacio', -65, 12, 8, '65 a.C.', -8, 11, 27, '8 a.C.', 'Poeta lírico romano, autor de \"Carpe diem\".', 'Quintus Horatius Flaccus', 5, 2, 'Poeta lyricus Romanus, auctor \"Carpe diem\".'),
(15, 'René Descartes', 1596, 3, 31, '31/03/1596', 1650, 2, 11, '11/02/1650', 'Filósofo y matemático francés.', 'Renatus Cartesius', 7, 9, 'Philosophus et mathematicus Francogallicus.'),
(16, 'Francis Bacon', 1561, 1, 22, '22/01/1561', 1626, 4, 9, '09/04/1626', 'Filósofo y estadista inglés, autor de \"El conocimiento es poder\".', 'Franciscus Bacon', 7, 6, 'Philosophus et civis Anglicus, auctor \"Scientia potentia est\".'),
(17, 'San Agustín', 354, 11, 13, '13/11/354', 430, 8, 28, '28/08/430', 'Filósofo y teólogo cristiano.', 'Aurelius Augustinus', 5, 2, 'Philosophus et theologus Christianus.'),
(18, 'Shakespeare', 1564, 4, 23, '23/04/1564', 1616, 4, 23, '23/04/1616', 'Dramaturgo y poeta inglés, autor de Hamlet.', 'Gulielmus Shakespeare', 7, 6, 'Dramaturgus et poeta Anglicus, auctor \"Hamlet\".'),
(19, 'Salomón', -990, NULL, NULL, '990 a. C.', -931, NULL, NULL, '931 a. C.', 'Rey de Israel, autor de proverbios y textos bíblicos.', 'Salomon', 5, 14, 'Rex Israel, auctor proverbiorum et textuum sacrorum.'),
(20, 'Dale Carnegie', 1888, 11, 24, '24/11/1888', 1955, 11, 1, '01/11/1955', 'Escritor y conferencista estadounidense, autor de libros de desarrollo personal.', 'Daleus Carnegieus', 8, 18, 'Scriba et orator Americanus, auctor librorum de progressu personali.'),
(21, 'Anónimo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Autor desconocido, usado para refranes y proverbios populares.', 'Anonymous', NULL, NULL, 'Auctor ignotus, usus pro proverbiorum popularium collectione.'),
(22, 'Provervio Chino', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Conjunto de proverbios tradicionales de la cultura china que transmiten sabiduría popular, valores morales y enseñanzas prácticas transmitidas oralmente durante siglos.', 'Proverbium Sinense', NULL, 12, 'Collectio sententiarum Sinensium, magnopere in cultura tradita.'),
(23, 'Proverbio Japonés', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Expresiones tradicionales de la cultura japonesa que resumen enseñanzas morales, filosóficas y prácticas derivadas del budismo, el sintoísmo y la experiencia popular.', 'Proverbium Iaponicum', NULL, 11, 'Collectio sententiarum Iaponicarum.'),
(25, 'Refrán Francés', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Refranes populares de la tradición oral francesa que transmiten observaciones sobre la vida, el trabajo y la conducta humana.', 'Sententia Gallica', NULL, 9, 'Collectio sententiarum Gallicarum.'),
(26, 'Refrán Ruso', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Dichos tradicionales del pueblo ruso que condensan la experiencia colectiva, el ingenio y la filosofía popular transmitida de generación en generación.', 'Sententia Russica', NULL, 16, 'Collectio sententiarum Russicarum.'),
(27, 'Refrán Español', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Refranes populares de la tradición oral hispana que expresan de forma breve y ingeniosa enseñanzas prácticas sobre la vida cotidiana.', 'Sententia Hispanica', NULL, 7, 'Collectio sententiarum Hispanicarum.'),
(28, 'Refrán Vasco', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Proverbios de la tradición oral vasca que reflejan la relación con la naturaleza, el trabajo y los valores comunitarios del pueblo vasco.', 'Sententia Vasconica', NULL, 7, 'Collectio sententiarum Vasconicarum.'),
(30, 'Gayo Julio César', -100, 7, 12, '100 a.C.', -44, 3, 15, '44 a.C.', 'Político, militar y escritor romano. Protagonizó el final de la República Romana y el ascenso del Imperio. Conquistó la Galia, cruzó el Rubicón en 49 a. C. iniciando la guerra civil, y ejerció el poder como dictador vitalicio. Fue asesinado el 15 de marzo de 44 a. C. durante los Idus de marzo.', 'Gaius Iulius Caesar', 5, 2, 'Politicus, miles et scriptor Romanus. Finitum Rei Publicae et ascensus Imperii. Galliam vicit, Rubiconem transiit anno 49 a.C., bellum civile incepit, dictator perpetuus factus. Interfectus est die 15 Martii 44 a.C.'),
(31, 'Parménides', -515, NULL, NULL, 'c. 515 a.C.', -450, NULL, NULL, 'c. 450 a.C.', 'Filósofo presocrático griego, fundador de la escuela eleática. Defendió la idea de la permanencia del ser y que nada surge de la nada.', 'Parmenides', 5, 1, 'Philosophus Praesocraticus Graecus, schola Eleatica conditor. Ideam constantiae entis defendit, nihil ex nihilo oriri.'),
(32, 'Confucio', -551, 9, 28, '28/09/551 a.C.', -479, 4, 11, '11/04/479 a.C.', 'Filósofo y maestro chino, fundador del confucianismo. Sus enseñanzas influyeron profundamente en la cultura, ética y política de China.', 'Confucius', 5, 12, 'Philosophus et magister Sinensis, confucianismi conditor. Doctrinae eius in culturam, ethicam et politicam Sinensem profunde influentes.'),
(33, 'Isidoro de Sevilla', 560, NULL, NULL, 'c. 560', 636, NULL, NULL, 'c. 636', 'Arzobispo de Sevilla, erudito y escritor español. Autor de \"Etimologías\", obra enciclopédica que recoge gran parte del saber de su época.', 'Isidorus Hispalensis', 6, 7, 'Archiepiscopus Hispaliensis, eruditus et scriptor Hispanicus, auctor \"Etymologiae\".'),
(34, 'Séneca', -4, NULL, NULL, '4 a.C.', 65, NULL, NULL, '65 d.C.', 'Filósofo, escritor y político romano, representante del estoicismo. Autor de numerosas cartas y tratados morales.', 'Lucius Annaeus Seneca', 5, 2, 'Philosophus, scriptor et politicus Romanus, stoicismus repraesentans. Multas epistulas et tractatus morales scripsit.'),
(37, 'Santo Tomás de Aquino', 1225, NULL, NULL, '1225', 1274, 3, 7, '7/03/1274', 'Filósofo y teólogo italiano, representante de la Escolástica. Autor de la \"Summa Theologica\".', 'Thomas Aquinas', 6, 10, 'Philosophus et theologus Italicus, Scholasticae repraesentans. Auctor \"Summa Theologica\".'),
(38, 'Friedrich Nietzsche', 1844, 10, 15, '15/10/1844', 1900, 8, 25, '25/08/1900', 'Filósofo, poeta y filólogo alemán. Autor de obras como \"Así habló Zaratustra\" y \"Más allá del bien y del mal\".', 'Friedrich Nietzsche', 8, 8, 'Philosophus, poeta et philologus Germanicus, auctor operum ut \"Ita loquutus est Zarathustra\" et \"Ultra bonum et malum\".'),
(39, 'G. K. Chesterton', 1874, 5, 29, '29/05/1874', 1936, 6, 14, '14/06/1936', 'Escritor, poeta, filósofo y periodista inglés. Famoso por sus ensayos, cuentos de misterio y defensa del cristianismo.', 'Gilbert Keith Chesterton', 8, 6, 'Scriba, poeta, philosophus et diurnarius Anglicus. Notus pro essayis, fabulis mysteriis et Christianismi defensione.'),
(40, 'Juan Pablo II', 1920, 5, 18, '18/05/1920', 2005, 4, 2, '02/04/2005', 'Papa de la Iglesia Católica desde 1978 hasta 2005. Destacado por su labor pastoral, defensa de la vida y los derechos humanos.', 'Ioannes Paulus II', 8, 15, 'Papa Ecclesiae Catholicae ab anno 1978 usque 2005. Labor pastoral, vitae tutela et iura humana praecipuus.'),
(41, 'San Juan Bautista de La Salle', 1651, 4, 30, '30/04/1651', 1719, 4, 7, '07/04/1719', 'Sacerdote francés y fundador de los Hermanos de las Escuelas Cristianas, dedicados a la educación cristiana de los jóvenes, especialmente pobres.', 'Sanctus Ioannes Baptista de La Salle', 7, 9, 'Sacerdos Francogallicus, fratres Scholarium Christianorum fundator. Iuvenes praecipue pauperes educavit.'),
(42, 'Proverbio Árabe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Proverbios tradicionales de la cultura árabe que transmiten valores de hospitalidad, honor, paciencia y sabiduría práctica.', 'Proverbium Arabica', NULL, NULL, 'Collectio sententiarum Arabicarum.'),
(45, 'Proverbio Hindú', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Dichos tradicionales de la India que reflejan principios espirituales, filosóficos y morales influidos por el hinduismo y las tradiciones védicas.', 'Proverbium Indica', NULL, 17, 'Collectio sententiarum Indicarum.'),
(48, 'Oswald Spengler', 1880, 5, 29, '29/05/1880', 1936, 5, 8, '08/05/1936', 'Filósofo e historiador alemán, autor de \"La decadencia de Occidente\".', 'Oswaldus Spengler', 8, 8, 'Philosophus et historicus Germanicus, auctor \"Occidentis Decadentia\".'),
(49, 'Miguel de Cervantes', 1547, 9, 29, '29/09/1547', 1616, 4, 23, '23/04/1616', 'Novelista, poeta y dramaturgo español, autor de \"Don Quijote de la Mancha\".', 'Michael Cervantes', 7, 7, 'Scriba, poeta et dramatist Hispanicus, auctor \"Don Quixote de la Mancha\".'),
(50, 'Nelson Mandela', 1918, 7, 18, '18/07/1918', 2013, 12, 5, '05/12/2013', 'Político y activista sudafricano, primer presidente negro de Sudáfrica y líder contra el apartheid.', 'Nelsonus Mandela', 8, NULL, 'Politicus et activist Africanus Australis, primus praeses niger et apartheid adversator.'),
(51, 'Mahatma Gandhi', 1869, 10, 2, '02/10/1869', 1948, 1, 30, '30/01/1948', 'Líder político y espiritual de India, impulsor de la resistencia no violenta.', 'Mohandas Gandhi', 8, 17, 'Dux politicis et spiritualis Indiae, resistentiam non violentam promovere.'),
(52, 'Albert Einstein', 1879, 3, 14, '14/03/1879', 1955, 4, 18, '18/04/1955', 'Físico teórico alemán, desarrolló la teoría de la relatividad.', 'Albertus Einstein', 8, 8, 'Physicus theoreticus Germanicus, theoriam relativitatis excogitavit.'),
(53, 'Martin Luther King Jr.', 1929, 1, 15, '15/01/1929', 1968, 4, 4, '04/04/1968', 'Líder del movimiento por los derechos civiles en Estados Unidos y activista por la igualdad racial.', 'Martin Luther King', 8, 18, 'Dux iurium civilium et activist aequalitatis racialium in Civitatibus Foederatis.'),
(54, 'John Dewey', 1859, 10, 20, '20/10/1859', 1952, 6, 1, '01/06/1952', 'Filósofo y pedagogo estadounidense, defensor de la educación progresista.', 'Ioannes Dewey', 8, 18, 'Philosophus et paedagogus Americanus, educationem progressivam defendens.'),
(55, 'Benjamin Franklin', 1706, 1, 17, '17/01/1706', 1790, 4, 17, '17/04/1790', 'Político, científico y escritor estadounidense, uno de los Padres Fundadores de Estados Unidos.', 'Benjaminus Franklin', 8, 18, 'Politicus, sapiens et scriptor Americanus, unus ex Patribus Fundatoribus.'),
(56, 'Leonardo Da Vinci', 1452, 4, 15, '15/04/1452', 1519, 5, 2, '02/05/1519', 'Artista, inventor y científico italiano del Renacimiento.', 'Leonardus Vincius', 7, 10, 'Artifex, inventor et physicus Italicus Renaissance.'),
(57, 'Proverbio Tibetano', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Proverbios de la tradición tibetana inspirados en la filosofía budista, centrados en la compasión, la impermanencia y el equilibrio interior.', '', NULL, NULL, 'Collectio sententiarum Tibeticarum.'),
(58, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Proverbium Tibetanum', NULL, NULL, 'Collectio sententiarum Tibeticarum.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(2, 'Amor'),
(3, 'Humor'),
(1, 'Motivación'),
(5, 'Sabiduría'),
(4, 'Vida');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` int(11) NOT NULL,
  `cita_original` text NOT NULL,
  `cita_traducida` text DEFAULT NULL,
  `autor_id` int(11) DEFAULT NULL,
  `tipo_id` int(11) DEFAULT NULL,
  `idioma_id` int(11) DEFAULT NULL,
  `fuente` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  `cita_la` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`id`, `cita_original`, `cita_traducida`, `autor_id`, `tipo_id`, `idioma_id`, `fuente`, `fecha_creacion`, `cita_la`) VALUES
(37, 'La vie est belle', 'La vida es bella', 25, 1, 3, 'Refrán francés', '2025-11-29 23:54:02', 'Vita pulchra est.'),
(38, 'A caballo regalado, no le mires el diente', 'A caballo regalado, no le mires el diente', 27, 1, 1, 'Uso popular', '2025-11-29 23:54:02', 'Equi dati dentes non inspiciuntur.'),
(40, '十人十色', 'Cada persona es diferente', 23, 1, 7, 'Uso popular Japonés', '2025-11-29 23:54:02', 'Quot homines, tot sententiae.'),
(41, 'Без труда не выловишь и рыбку из пруда', 'Sin esfuerzo no se consigue nada', 26, 1, 8, 'Refrán ruso', '2025-11-29 23:54:02', 'Sine labore nihil obtinetur.'),
(42, '生命在于运动', 'La vida está en el movimiento', 21, 2, 4, 'Proverbio chino', '2025-11-29 23:54:02', 'Vita in motu est.'),
(43, 'עַיִן תַּחַת עַיִן שֵׁן תַּחַת שֵׁן', 'Ojo por ojo, diente por diente', 19, 2, 14, 'Éxodo 21,24', '2025-11-29 23:54:02', 'Oculum pro oculo, dentem pro dente.'),
(44, 'El amor es fuerte como la muerte; los celos son crueles como la tumba', 'El amor es fuerte como la muerte; los celos son crueles como la tumba', 19, 2, 2, 'Salomón', '2025-11-29 23:54:02', 'Fortis est amor sicut mors; dura est aemulatio sicut infernus.'),
(45, 'Cogito ergo sum', 'Pienso, luego existo', 15, 3, 5, 'René Descartes', '2025-11-29 23:54:02', 'Cogito, ergo sum.'),
(46, 'Knowledge is power', 'El conocimiento es poder', 16, 3, 2, 'Francis Bacon', '2025-11-29 23:54:02', 'Scientia potentia est.'),
(47, 'Vera felicitas in bono faciendo consistit', 'La verdadera felicidad consiste en hacer el bien', 17, 4, 5, 'San Agustín', '2025-11-29 23:54:02', 'Vera felicitas in bonis operibus consistit.'),
(48, 'Recuerda que la felicidad no depende de quién eres o qué tienes; depende únicamente de lo que piensas', 'Recuerda que la felicidad no depende de quién eres o qué tienes; depende únicamente de lo que piensas', 20, 4, 2, 'Dale Carnegie', '2025-11-29 23:54:02', 'Memento felicitatem non pendere ab eo quod es aut habes, sed ab iis quae cogitas.'),
(49, 'No dejes para mañana lo que puedas hacer hoy', 'No dejes para mañana lo que puedas hacer hoy', 27, 5, 1, 'Uso popular', '2025-11-29 23:54:02', 'Noli in crastinum differre quod hodie facere potes.'),
(50, 'Carpe diem', 'Aprovecha el día', 14, 6, 5, 'Horacio', '2025-11-29 23:54:02', 'Carpe diem.'),
(51, 'To be, or not to be, that is the question', 'Ser o no ser, esa es la cuestión', 18, 6, 2, 'Shakespeare', '2025-11-29 23:54:02', 'Esse aut non esse, haec est quaestio.'),
(52, 'No es lo mismo fracasar que estrellarse', 'No es lo mismo fracasar que estrellarse', 27, 7, 1, 'Uso popular', '2025-11-29 23:54:02', 'Non idem est cadere ac collidi.'),
(53, '女人悄然抹去的岁月，并未真被时光吞没 而是悄悄落在了她闺中好友的眉眼之间', 'Los años que una mujer borra en silencio no son devorados por el tiempo; se posan, suavemente, en los rasgos de sus amigas más íntimas', 22, 7, 4, NULL, '2025-12-06 20:14:54', 'Anni quos femina silentio delet non a tempore devorantur, sed in vultibus amicorum quiescunt.'),
(54, 'Alea iacta est', 'La suerte está echada', 30, 3, 5, NULL, '2025-12-06 20:18:22', 'Alea iacta est.'),
(55, 'Ex nihilo nihil fit', 'Nada surge de la nada', 31, 6, 5, 'Parménides', '2025-12-06 21:05:09', 'Ex nihilo nihil fit.'),
(56, '人皆有智慧 只是早晚而已', 'Todos los hombres son sabios; unos antes, los otros después.', 22, 2, 4, 'Proverbio chino', '2025-12-06 21:08:03', 'Omnes homines sapientes sunt, alii citius, alii postea.'),
(57, '知之者不如好之者 好之者不如乐之者', 'El que sabe de ello no se compara con el que lo ama; el que lo ama no se compara con el que se deleita en ello.', 32, 2, 4, 'Confucio', '2025-12-06 21:11:14', 'Qui scit non aequatur ei qui amat; qui amat non aequatur ei qui delectatur.'),
(58, '学而不思则罔 思而不学则殆', 'Aprender sin reflexionar es inútil; reflexionar sin aprender es peligroso.', 32, 2, 4, 'Confucio', '2025-12-06 21:11:14', 'Discere sine cogitatione inutile est; cogitare sine doctrina periculosum est.'),
(59, '己所不欲 勿施于人', 'No hagas a otros lo que no deseas para ti mismo.', 32, 2, 4, 'Confucio', '2025-12-06 21:11:14', 'Quod tibi non vis, alteri ne feceris.'),
(61, 'Amor vincit omnia.', 'El amor lo conquista todo.', 17, 6, 5, 'San Agustín', '2025-12-06 21:15:55', 'Amor omnia vincit.'),
(62, 'Fides quaerens intellectum.', 'La fe busca el entendimiento.', 17, 6, 5, 'San Agustín', '2025-12-06 21:15:55', 'Fides intellectum quaerit.'),
(72, 'Omnia tempus habent.', 'Todo tiene su tiempo.', 33, 4, 5, 'Isidoro de Sevilla', '2025-12-06 21:18:52', 'Omnia tempus habent.'),
(73, 'Verba volant, scripta manent.', 'Las palabras vuelan, lo escrito permanece.', 33, 6, 5, 'Isidoro de Sevilla', '2025-12-06 21:18:52', 'Verba volant, scripta manent.'),
(74, 'Ignorantia legis non excusat.', 'La ignorancia de la ley no excusa.', 33, 6, 5, 'Isidoro de Sevilla', '2025-12-06 21:18:52', 'Ignorantia legis non excusat.'),
(75, 'Scientia potentia est.', 'El conocimiento es poder.', 33, 5, 5, 'Isidoro de Sevilla', '2025-12-06 21:18:52', 'Scientia est potestas.'),
(76, '不耻下问', 'Aquel que pregunta es un tonto por cinco minutos, pero el que no pregunta permanece tonto por siempre.', 22, 2, 4, 'Proverbio chino', '2025-12-06 21:22:02', 'Qui rogat stultus est ad horam; qui non rogat stultus manet in aeternum.'),
(77, '千里之行，始于足下。', 'Un viaje de mil millas comienza con un solo paso.', 22, 2, 4, 'Proverbio chino', '2025-12-06 21:22:02', 'Iter mille milium uno passu incipit.'),
(78, '授人以鱼不如授人以渔。', 'Dar un pez a alguien no es tan bueno como enseñarle a pescar.', 22, 2, 4, 'Proverbio chino', '2025-12-06 21:22:02', 'Potius est docere piscari quam piscem dare.'),
(79, '知足常乐。', 'Quien se conforma, siempre es feliz.', 22, 2, 4, 'Proverbio chino', '2025-12-06 21:22:02', 'Qui contentus est, semper beatus est.'),
(80, '海纳百川，有容乃大。', 'El mar acepta todos los ríos; así se hace grande.', 22, 2, 4, 'Proverbio chino', '2025-12-06 21:22:02', 'Mare omnes fluvios recipit et ideo magnum est.'),
(81, '学而不思则罔，思而不学则殆。', 'Aprender sin reflexionar es inútil; reflexionar sin aprender es peligroso.', 22, 2, 4, 'Proverbio chino', '2025-12-06 21:22:02', 'Discere sine cogitatione inutile est; cogitare sine doctrina periculosum est.'),
(82, '三人行，必有我师焉。', 'Si tres caminan juntos, siempre hay algo que puedo aprender de ellos.', 22, 2, 4, 'Proverbio chino', '2025-12-06 21:22:03', 'Inter tres ambulantes, semper magister est.'),
(83, '七転び八起き', 'Cae siete veces, levántate ocho.', 23, 2, 7, 'Proverbio japonés', '2025-12-06 21:23:25', 'Septies cade, octies surge.'),
(84, '猿も木から落ちる', 'Hasta los monos se caen de los árboles.', 23, 2, 7, 'Proverbio japonés', '2025-12-06 21:23:25', 'Etiam simiae ex arboribus cadunt.'),
(85, '急がば回れ', 'Más vale dar un rodeo que precipitarse.', 23, 2, 7, 'Proverbio japonés', '2025-12-06 21:23:25', 'Qui festinat circuit.'),
(86, '石の上にも三年', 'Incluso sobre una piedra, tres años.', 23, 2, 7, 'Proverbio japonés', '2025-12-06 21:23:25', 'Etiam super lapidem, triennium.'),
(87, '雨降って地固まる', 'Después de la lluvia, la tierra se endurece.', 23, 2, 7, 'Proverbio japonés', '2025-12-06 21:23:25', 'Post pluviam terra confirmatur.'),
(88, '袖振り合うも多生の縁', 'Incluso rozarse las mangas es el resultado de muchas vidas de destino.', 23, 2, 7, 'Proverbio japonés', '2025-12-06 21:23:26', 'Etiam leviter contingere manicas est fatum multarum vitarum.'),
(89, '口は災いの元', 'La boca es la fuente del desastre.', 23, 2, 7, 'Proverbio japonés', '2025-12-06 21:23:26', 'Os est fons calamitatis.'),
(90, 'Vita sine litteris mors est.', 'La vida sin estudio es una muerte.', 34, 3, 5, 'Séneca', '2025-12-06 21:30:34', 'Vita sine litteris mors est.'),
(91, 'Non est ad astra mollis e terris via.', 'No hay camino fácil de la tierra a las estrellas.', 34, 3, 5, 'Séneca', '2025-12-06 21:30:34', 'Non est ad astra mollis e terris via.'),
(92, 'Dum inter homines sumus, colamus humanitatem.', 'Mientras estemos entre hombres, cultivemos la humanidad.', 34, 3, 5, 'Séneca', '2025-12-06 21:30:34', 'Dum inter homines sumus, humanitatem colamus.'),
(93, 'Faber est suae quisque fortunae.', 'Cada uno es artífice de su propia fortuna.', 34, 3, 5, 'Séneca', '2025-12-06 21:30:34', 'Quisque est faber fortunae suae.'),
(94, 'Sine ira et studio.', 'Sin ira ni pasión.', 34, 3, 5, 'Séneca', '2025-12-06 21:30:34', 'Sine ira et studio.'),
(95, 'Veritas est adaequatio rei et intellectus.', 'La verdad es la adecuación del intelecto con la realidad.', 37, 3, 5, 'Santo Tomás de Aquino', '2025-12-06 21:32:33', 'Veritas est adaequatio rei et intellectus.'),
(96, 'Amor dei et proximi.', 'Amor a Dios y al prójimo.', 37, 3, 5, 'Santo Tomás de Aquino', '2025-12-06 21:32:33', 'Amor Dei et proximi.'),
(97, 'Fides et ratio concordant.', 'La fe y la razón están en armonía.', 37, 3, 5, 'Santo Tomás de Aquino', '2025-12-06 21:32:33', 'Fides et ratio concordant.'),
(98, 'Bonum commune praefertur bono singulari.', 'El bien común debe prevalecer sobre el bien individual.', 37, 3, 5, 'Santo Tomás de Aquino', '2025-12-06 21:32:33', 'Bonum commune praeferendum est bono singulari.'),
(99, 'Homo est summum bonum quaerens.', 'El hombre busca el bien supremo.', 37, 3, 5, 'Santo Tomás de Aquino', '2025-12-06 21:32:33', 'Homo summum bonum quaerit.'),
(100, 'Gott ist tot.', 'Dios ha muerto.', 38, 3, 9, 'Friedrich Nietzsche', '2025-12-06 21:34:35', 'Deus mortuus est.'),
(101, 'Was mich nicht umbringt, macht mich stärker.', 'Lo que no me mata, me hace más fuerte.', 38, 3, 9, 'Friedrich Nietzsche', '2025-12-06 21:34:35', 'Quod me non necat, fortiorem me facit.'),
(102, 'Ohne Musik wäre das Leben ein Irrtum.', 'Sin música, la vida sería un error.', 38, 3, 9, 'Friedrich Nietzsche', '2025-12-06 21:34:35', 'Sine musica vita error esset.'),
(103, 'Der Mensch ist etwas, das überwunden werden soll.', 'El hombre es algo que debe ser superado.', 38, 3, 9, 'Friedrich Nietzsche', '2025-12-06 21:34:35', 'Homo est aliquid quod superandum est.'),
(104, 'Es gibt immer etwas Wahnsinn in der Liebe. Aber es gibt auch immer etwas Vernunft im Wahnsinn.', 'Siempre hay algo de locura en el amor. Pero también hay algo de razón en la locura.', 38, 3, 9, 'Friedrich Nietzsche', '2025-12-06 21:34:35', 'Semper aliquid insaniae in amore est, sed etiam aliquid rationis in insania.'),
(105, 'The true soldier fights not because he hates what is in front of him, but because he loves what is behind him.', 'El verdadero soldado lucha no porque odie lo que tiene delante, sino porque ama lo que tiene detrás.', 39, 3, 2, 'G. K. Chesterton', '2025-12-06 21:36:33', 'Verus miles pugnat non quia odit quod ante se est, sed quia amat quod post se est.'),
(106, 'An adventure is only an inconvenience rightly considered. An inconvenience is only an adventure wrongly considered.', 'Una aventura es solo un inconveniente correctamente considerado. Un inconveniente es solo una aventura mal considerada.', 39, 3, 2, 'G. K. Chesterton', '2025-12-06 21:36:33', 'Aventura est incommodum recte consideratum; incommodum est aventura male considerata.'),
(107, 'There are no rules of architecture for a castle in the clouds.', 'No hay reglas de arquitectura para un castillo en las nubes.', 39, 3, 2, 'G. K. Chesterton', '2025-12-06 21:36:33', 'Nullae sunt regulae architecturae pro castello in nubibus.'),
(108, 'The way to love anything is to realize that it may be lost.', 'La manera de amar algo es darse cuenta de que puede perderse.', 39, 3, 2, 'G. K. Chesterton', '2025-12-06 21:36:33', 'Via ad amandum est intellegere posse amitti.'),
(109, 'Fallacies do not cease to be fallacies because they become fashions.', 'Las falacias no dejan de ser falacias porque se conviertan en modas.', 39, 3, 2, 'G. K. Chesterton', '2025-12-06 21:36:33', 'Fallaciae non desinunt fallaciae esse quia fiunt consuetudines.'),
(110, 'Veritatem defendere oportet omni pretio, etiam si solum duodecim restemus.', 'Tenemos que defender la verdad a toda costa, aunque volvamos a ser solamente doce.', 40, 3, 5, 'Juan Pablo II', '2025-12-06 21:42:20', 'Veritatem defendere oportet omni pretio, etiam si soli duodecim maneamus.'),
(111, 'Fides est lux quae tenebras illuminat.', 'La fe es la luz que ilumina las tinieblas.', 40, 3, 5, 'Juan Pablo II', '2025-12-06 21:43:32', 'Fides est lux quae tenebras illuminat.'),
(112, 'Caritas omnia vincit.', 'El amor todo lo vence.', 40, 3, 5, 'Juan Pablo II', '2025-12-06 21:43:32', 'Caritas omnia vincit.'),
(113, 'Pacem in terris quaerimus.', 'Buscamos la paz en la tierra.', 40, 3, 5, 'Juan Pablo II', '2025-12-06 21:43:32', 'Pacem in terris quaerimus.'),
(114, 'Spiritus Sanctus nos ducit ad veritatem.', 'El Espíritu Santo nos guía hacia la verdad.', 40, 3, 5, 'Juan Pablo II', '2025-12-06 21:43:32', 'Spiritus Sanctus nos ad veritatem ducit.'),
(115, 'Veritas vos liberabit.', 'La verdad os hará libres.', 40, 3, 5, 'Juan Pablo II', '2025-12-06 21:43:32', 'Veritas vos liberabit.'),
(116, 'Omnia opera nostra in Deo ponamus.', 'Todas nuestras obras pongamos en Dios.', 40, 3, 5, 'Juan Pablo II', '2025-12-06 21:43:32', 'Omnia opera nostra in Deo ponamus.'),
(117, 'Fidei virtus semper vincit timorem.', 'La fuerza de la fe siempre vence al miedo.', 40, 3, 5, 'Juan Pablo II', '2025-12-06 21:43:32', 'Virtus fidei timorem semper vincit.'),
(118, 'Homines dignitatem suam servare debent.', 'Los hombres deben preservar su dignidad.', 40, 3, 5, 'Juan Pablo II', '2025-12-06 21:43:32', 'Homines dignitatem suam servare debent.'),
(119, 'Amor Dei et proximi est fundamentum vitae.', 'El amor a Dios y al prójimo es el fundamento de la vida.', 40, 3, 5, 'Juan Pablo II', '2025-12-06 21:43:32', 'Amor Dei et proximi est fundamentum vitae.'),
(120, 'Homo sine litteris mors est.', 'El hombre sin educación es como un cadáver.', 41, 3, 5, 'San Juan Bautista de La Salle', '2025-12-06 21:44:32', 'Homo sine litteris quasi cadaver est.'),
(121, 'الصبر مفتاح الفرج', 'La paciencia es la llave para la solución.', 42, 2, 12, 'Proverbio Árabe', '2025-12-06 21:52:00', 'Patientia clavis liberationis est.'),
(122, 'من جد وجد', 'Quien se esfuerza, encuentra.', 42, 2, 12, 'Proverbio Árabe', '2025-12-06 21:52:00', 'Qui laborat invenit.'),
(123, 'العقل زينة', 'La mente es un adorno.', 42, 2, 12, 'Proverbio Árabe', '2025-12-06 21:52:00', 'Mens ornamentum est.'),
(124, 'الصديق وقت الضيق', 'El amigo se conoce en la adversidad.', 42, 2, 12, 'Proverbio Árabe', '2025-12-06 21:52:00', 'Amicus in angustiis cognoscitur.'),
(125, 'العلم نور', 'El conocimiento es luz.', 42, 2, 12, 'Proverbio Árabe', '2025-12-06 21:52:00', 'Scientia lux est.'),
(126, 'من حفر حفرة لأخيه وقع فيها', 'Quien cava un hoyo para su hermano, caerá en él.', 42, 2, 12, 'Proverbio Árabe', '2025-12-06 21:52:00', 'Qui foveam fratri fodit in eam cadit.'),
(127, 'يد واحدة لا تصفق', 'Una sola mano no aplaude.', 42, 2, 12, 'Proverbio Árabe', '2025-12-06 21:52:00', 'Una manus non plausum facit.'),
(128, 'التجربة خير معلم', 'La experiencia es el mejor maestro.', 42, 2, 12, 'Proverbio Árabe', '2025-12-06 21:52:00', 'Experientia optimus magister est.'),
(129, 'الوقت كالسيف إن لم تقطعه قطعك', 'El tiempo es como una espada; si no lo cortas, te corta.', 42, 2, 12, 'Proverbio Árabe', '2025-12-06 21:52:00', 'Tempus sicut gladius est: si non id caedis, te caedit.'),
(130, 'الكتاب خير جليس', 'El libro es el mejor compañero.', 42, 2, 12, 'Proverbio Árabe', '2025-12-06 21:52:00', 'Liber optimus comes est.'),
(131, 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन', 'Tu derecho es actuar, no los frutos de la acción.', 45, 2, 13, 'Proverbio Hindú', '2025-12-06 21:57:54', 'Tuum ius est agere, non fructus actionis.'),
(132, 'योगः कर्मसु कौशलम्', 'Yoga es perfección en la acción.', 45, 2, 13, 'Proverbio Hindú', '2025-12-06 21:57:54', 'Yoga est perfectio in operatione.'),
(133, 'अहिंसा परमोधर्मः', 'La no violencia es la máxima virtud.', 45, 2, 13, 'Proverbio Hindú', '2025-12-06 21:57:54', 'Non violentia summa virtus est.'),
(134, 'सत्यं वद', 'Di la verdad.', 45, 2, 13, 'Proverbio Hindú', '2025-12-06 21:57:54', 'Veritatem dic.'),
(135, 'तपो न हि विजितम्', 'La disciplina conduce a la victoria.', 45, 2, 13, 'Proverbio Hindú', '2025-12-06 21:57:54', 'Disciplina ad victoriam ducit.'),
(136, 'विद्या ददाति विनयम्', 'La educación da humildad.', 45, 2, 13, 'Proverbio Hindú', '2025-12-06 21:57:54', 'Doctrina humilitatem dat.'),
(137, 'सुखं वा दुःखं वा जीवनम्', 'La vida tiene placer y dolor.', 45, 2, 13, 'Proverbio Hindú', '2025-12-06 21:57:54', 'Vita gaudium et dolorem habet.'),
(138, 'न मित्रस्य वियोगः दुःखः', 'La separación de un amigo duele.', 45, 2, 13, 'Proverbio Hindú', '2025-12-06 21:57:54', 'Amici separatio dolet.'),
(139, 'आत्मनः प्रतिपालने शान्ति', 'La paz viene del cuidado de uno mismo.', 45, 2, 13, 'Proverbio Hindú', '2025-12-06 21:57:54', 'Pax ex cura sui venit.'),
(140, 'शुद्धमनसा कर्म करोति', 'Actúa con mente pura.', 45, 2, 13, 'Proverbio Hindú', '2025-12-06 21:57:54', 'Mente pura age.'),
(146, 'Die Kultur ist die Seele einer Zivilisation.', 'La cultura es el alma de una civilización.', 48, 6, 9, 'Oswald Spengler', '2025-12-06 22:02:31', 'Cultura anima est civilisationis.'),
(147, 'Jede Zivilisation hat ihren Zyklus von Geburt, Wachstum und Verfall.', 'Cada civilización tiene su ciclo de nacimiento, crecimiento y decadencia.', 48, 6, 9, 'Oswald Spengler', '2025-12-06 22:02:31', 'Unaquaeque civilizatio habet цикл natalis, crescentiae et ruinae.'),
(148, 'Die Geschichte schreitet nicht voran, Kulturen entstehen, blühen und sterben.', 'La historia no progresa, sino que las culturas nacen, florecen y mueren.', 48, 6, 9, 'Oswald Spengler', '2025-12-06 22:02:31', 'Historia non progreditur, sed culturae nascuntur, florent et moriuntur.'),
(149, 'Die westliche Zivilisation ist in ihre Endphase des Niedergangs eingetreten.', 'La civilización occidental ha entrado en su fase final de declive.', 48, 6, 9, 'Oswald Spengler', '2025-12-06 22:02:31', 'Civilizatio occidentalis in ultimam declinationis phasein intravit.'),
(150, 'Politik und Wirtschaft sind Manifestationen der Kultur, nicht ihr Bestimmungsfaktor.', 'La política y la economía son manifestaciones de la cultura, no la determinan.', 48, 6, 9, 'Oswald Spengler', '2025-12-06 22:02:31', 'Politica et oeconomia sunt manifestationes culturae, non eius factores.'),
(151, 'En un lugar de la Mancha, de cuyo nombre no quiero acordarme...', 'En un lugar de la Mancha, de cuyo nombre no quiero acordarme...', 49, 1, 1, 'Don Quijote de la Mancha', '2025-12-06 22:29:54', 'In loco Manche, cuius nomen nolo meminisse...'),
(152, 'El que lee mucho y anda mucho, ve mucho y sabe mucho.', 'El que lee mucho y anda mucho, ve mucho y sabe mucho.', 49, 6, 1, 'Don Quijote de la Mancha', '2025-12-06 22:29:54', 'Qui multum legit et multum ambulat, multum videt et multum scit.'),
(153, 'La pluma es la lengua del alma.', 'La pluma es la lengua del alma.', 49, 6, 1, 'Don Quijote de la Mancha', '2025-12-06 22:29:54', 'Calamus lingua animae est.'),
(154, 'Nunca pares de procurar ser mejor.', 'Nunca pares de procurar ser mejor.', 49, 5, 1, 'Don Quijote de la Mancha', '2025-12-06 22:29:54', 'Numquam desine melius esse quaerere.'),
(155, 'Cada uno es como Dios le hizo, y aun peor muchas veces.', 'Cada uno es como Dios le hizo, y aun peor muchas veces.', 49, 6, 1, 'Don Quijote de la Mancha', '2025-12-06 22:29:54', 'Unusquisque est sicut Deus fecit, et saepe peior.'),
(156, 'No es más que un sueño lo que se sueña en la vida.', 'No es más que un sueño lo que se sueña en la vida.', 49, 6, 1, 'Don Quijote de la Mancha', '2025-12-06 22:29:54', 'Somnium solum est quod in vita somniatur.'),
(157, 'La libertad, Sancho, es uno de los más preciosos dones que a los hombres dieron los cielos.', 'La libertad, Sancho, es uno de los más preciosos dones que a los hombres dieron los cielos.', 49, 6, 1, 'Don Quijote de la Mancha', '2025-12-06 22:29:54', 'Libertas, Sancho, donum pretiosissimum est quod caelum hominibus dedit.'),
(158, 'El que lee mucho y anda mucho, ve mucho y sabe mucho.', 'El que lee mucho y anda mucho, ve mucho y sabe mucho.', 49, 6, 1, 'Don Quijote de la Mancha', '2025-12-06 22:29:54', 'Qui multum legit et multum ambulat, multum videt et multum scit.'),
(159, 'Dulcinea del Toboso, señora de mi pensamiento.', 'Dulcinea del Toboso, señora de mi pensamiento.', 49, NULL, 1, 'Don Quijote de la Mancha', '2025-12-06 22:29:54', 'Dulcinea Tobosi, domina cogitationum mearum.'),
(160, 'Cambiar la tristeza en contento es la más sabrosa medicina del alma.', 'Cambiar la tristeza en contento es la más sabrosa medicina del alma.', 49, 6, 1, 'Don Quijote de la Mancha', '2025-12-06 22:29:54', 'Tristitiam in laetitiam mutare est medicamentum animae sapidissimum.'),
(161, 'Nosce te, accipe te, supera te.', 'Conócete, acéptate, supérate.', 17, 3, 5, 'Atribuido a San Agustín', '2025-12-06 22:37:03', 'Nosce te, accipe te, supera te.'),
(162, 'Education is the most powerful weapon which you can use to change the world.', 'La educación es el arma más poderosa que puedes usar para cambiar el mundo.', 50, 5, 2, 'Nelson Mandela', '2025-12-06 22:43:23', 'Educatio potentissimum telum est ad mundum mutandum.'),
(163, 'The true education consists in getting the best out of oneself.', 'La verdadera educación consiste en obtener lo mejor de uno mismo.', 51, 6, 2, 'Mahatma Gandhi', '2025-12-06 22:43:23', 'Vera educatio consistit in optimo ex se ipsis obtinendo.'),
(164, 'Education is what remains after one has forgotten what one has learned in school.', 'La educación es lo que queda después de olvidar lo que se ha aprendido en la escuela.', 52, 6, 2, 'Albert Einstein', '2025-12-06 22:43:23', 'Educatio remanet postquam obliviscimur quod in schola didicimus.'),
(165, 'The function of education is to teach one to think intensively and to think critically. Intelligence plus character – that is the goal of true education.', 'La función de la educación es enseñar a pensar intensamente y críticamente. Inteligencia más carácter: ese es el objetivo de la verdadera educación.', 53, 6, 2, 'Martin Luther King Jr.', '2025-12-06 22:43:23', 'Munus educationis est docere cogitare intense et critice. Ingenium cum moribus – hoc est finis verae educationis.'),
(166, 'Education is not preparation for life; education is life itself.', 'La educación no es preparación para la vida; la educación es la vida en sí misma.', 54, 6, 2, 'John Dewey', '2025-12-06 22:43:23', 'Educatio non est praeparatio ad vitam; educatio ipsa vita est.'),
(167, 'An investment in knowledge pays the best interest.', 'Una inversión en conocimiento paga el mejor interés.', 55, 5, 2, 'Benjamin Franklin', '2025-12-06 22:43:23', 'Investitio in scientia optimum redditum praestat.'),
(168, 'Disciplina animi numquam defatigat.', 'El aprendizaje nunca cansa a la mente.', 56, 6, 5, 'Leonardo Da Vinci', '2025-12-06 22:43:23', 'Disciplina animi numquam defatigat.'),
(169, '學而不思則罔，思而不學則殆。', 'Aprender sin pensar es esfuerzo perdido; pensar sin aprender, peligroso.', 32, 6, 4, 'Confucio', '2025-12-06 22:43:23', 'Discere sine cogitatione inutile est; cogitare sine discendo periculosum est.'),
(170, 'ཕྱི་ལོག་མི་སློབ་དང་མི་བྱེད་པ་ནི་སྤྱོད་པ་མ་འགྱོ་བའི་བྱེད་སྒོ་འདུག', 'Un niño sin educación es como un pájaro sin alas.', 57, 2, 1, 'Proverbio tibetano', '2025-12-06 22:43:23', 'Infans sine educatione quasi avis sine alis est.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas_categorias`
--

CREATE TABLE `citas_categorias` (
  `cita_id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `citas_categorias`
--

INSERT INTO `citas_categorias` (`cita_id`, `categoria_id`) VALUES
(45, 1),
(46, 1),
(48, 1),
(49, 1),
(50, 1),
(44, 2),
(52, 3),
(37, 4),
(38, 5),
(40, 5),
(41, 5),
(42, 5),
(43, 5),
(44, 5),
(47, 5),
(50, 5),
(51, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `epocas_historicas`
--

CREATE TABLE `epocas_historicas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `inicio_ano` int(11) DEFAULT NULL,
  `fin_ano` int(11) DEFAULT NULL,
  `nombre_la` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `epocas_historicas`
--

INSERT INTO `epocas_historicas` (`id`, `nombre`, `inicio_ano`, `fin_ano`, `nombre_la`) VALUES
(1, 'Paleolítico', -2500000, -10000, 'Paleolithicum'),
(2, 'Mesolítico', -10000, -5000, 'Mesolithicum'),
(3, 'Neolítico', -9000, -3000, 'Neolithicum'),
(4, 'Edad de los Metales', -3300, -1000, 'Aetas Metallorum'),
(5, 'Edad Antigua', -3300, 476, 'Aetas Antiqua'),
(6, 'Edad Media', 476, 1492, 'Aetas Media'),
(7, 'Edad Moderna', 1492, 1789, 'Aetas Moderna'),
(8, 'Edad Contemporánea', 1789, NULL, 'Aetas Contemporanea');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `idiomas`
--

CREATE TABLE `idiomas` (
  `id` int(11) NOT NULL,
  `codigo` varchar(10) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `idiomas`
--

INSERT INTO `idiomas` (`id`, `codigo`, `nombre`) VALUES
(1, 'es', 'Español'),
(2, 'en', 'Inglés'),
(3, 'fr', 'Francés'),
(4, 'zh', 'Chino'),
(5, 'la', 'Latín'),
(6, 'eu', 'Euskara'),
(7, 'ja', 'Japonés'),
(8, 'ru', 'Ruso'),
(9, 'de', 'Alemán'),
(10, 'it', 'Italiano'),
(11, 'pt', 'Portugués'),
(12, 'ar', 'Árabe'),
(13, 'hi', 'Hindi'),
(14, 'he', 'Hebreo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nacion`
--

CREATE TABLE `nacion` (
  `id` int(11) NOT NULL,
  `nombre_nacion` varchar(255) NOT NULL,
  `nombre_nacion_la` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `nacion`
--

INSERT INTO `nacion` (`id`, `nombre_nacion`, `nombre_nacion_la`) VALUES
(1, 'Grecia', 'Graecia'),
(2, 'Roma', 'Roma'),
(3, 'Egipto', 'Aegyptus'),
(4, 'Persia', 'Persia'),
(5, 'Mesopotamia', 'Mesopotamia'),
(6, 'Inglaterra', 'Anglia'),
(7, 'España', 'Hispania'),
(8, 'Alemania', 'Germania'),
(9, 'Francia', 'Gallia'),
(10, 'Italia', 'Italia'),
(11, 'Japón', 'Iaponia'),
(12, 'China', 'Sinae'),
(14, 'Israel', 'Israel'),
(15, 'Polonia', 'Polonia'),
(16, 'Rusia', 'Russia'),
(17, 'India', 'India'),
(18, 'Estados Unidos', 'Civitates Foederatae Americae');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_citas`
--

CREATE TABLE `tipos_citas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Volcado de datos para la tabla `tipos_citas`
--

INSERT INTO `tipos_citas` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Refrán', 'Frases populares, breves, con rima o ritmo, transmitidas oralmente. Ej.: \"A caballo regalado, no le mires el diente\"'),
(2, 'Proverbio', 'Frases de sabiduría, solemnes o morales, con origen identificable o textual. Ej.: \"Ojo por ojo, diente por diente\"'),
(3, 'Aforismo', 'Frases concisas de autor conocido, uso culto. Ej.: \"Pienso, luego existo\" (Descartes)'),
(4, 'Máxima / Sentencia', 'Frases prescriptivas o doctrinales, enfatizan moral o ética. Ej.: \"La verdadera felicidad consiste en hacer el bien\"'),
(5, 'Inspiracional', 'Frases que motivan o inspiran acción o actitud positiva. Ej.: \"No dejes para mañana lo que puedas hacer hoy\"'),
(6, 'Filosófica', 'Reflexiones sobre la vida, ética, existencia o pensamiento. Ej.: \"El hombre es la medida de todas las cosas\" (Protágoras)'),
(7, 'Humor', 'Frases con intención cómica, irónica o satírica. Ej.: \"No es lo mismo fracasar que estrellarse\"');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_autores_epoca` (`epoca_id`),
  ADD KEY `fk_autores_nacion` (`nacion_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autor_id` (`autor_id`),
  ADD KEY `tipo_id` (`tipo_id`),
  ADD KEY `idioma_id` (`idioma_id`);

--
-- Indices de la tabla `citas_categorias`
--
ALTER TABLE `citas_categorias`
  ADD PRIMARY KEY (`cita_id`,`categoria_id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `epocas_historicas`
--
ALTER TABLE `epocas_historicas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `idiomas`
--
ALTER TABLE `idiomas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `nacion`
--
ALTER TABLE `nacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipos_citas`
--
ALTER TABLE `tipos_citas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autores`
--
ALTER TABLE `autores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT de la tabla `epocas_historicas`
--
ALTER TABLE `epocas_historicas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `idiomas`
--
ALTER TABLE `idiomas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `nacion`
--
ALTER TABLE `nacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `tipos_citas`
--
ALTER TABLE `tipos_citas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `autores`
--
ALTER TABLE `autores`
  ADD CONSTRAINT `fk_autores_epoca` FOREIGN KEY (`epoca_id`) REFERENCES `epocas_historicas` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_autores_nacion` FOREIGN KEY (`nacion_id`) REFERENCES `nacion` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `1` FOREIGN KEY (`autor_id`) REFERENCES `autores` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `2` FOREIGN KEY (`tipo_id`) REFERENCES `tipos_citas` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `3` FOREIGN KEY (`idioma_id`) REFERENCES `idiomas` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `citas_categorias`
--
ALTER TABLE `citas_categorias`
  ADD CONSTRAINT `1` FOREIGN KEY (`cita_id`) REFERENCES `citas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

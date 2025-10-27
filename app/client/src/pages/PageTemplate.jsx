import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

/**
 * PageTemplate - Exemplo de página com múltiplas seções
 *
 * Estrutura (similar ao exemplo fornecido):
 * - Header (fixo - gerenciado por MainContainer)
 * - Container (body)
 *   - HeroSection
 *   - PreviewSection
 *   - ChallengesSection
 *   - CustomizationSection
 *   - WorldsSection
 * - Footer (fixo - gerenciado por MainContainer)
 *
 * Padrão de Espaçamento:
 * - Margem entre seções: 24px (md) / 16px (sm)
 * - Distância entre seções: 60px / 80px / 104px / 120px
 */

const SPACING = {
  sectionGap: { xs: "16px", md: "24px" },
  spacerSmall: "24px",
  spacerMedium: "60px",
  spacerLarge: "80px",
  spacerXLarge: "104px",
  spacerXXLarge: "120px",
};

// ============================================================
// HERO SECTION
// ============================================================
const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: { xs: "16px", md: "24px" },
      }}
    >
      <Typography
        variant={isMobile ? "h4" : "h3"}
        component="h1"
        sx={{
          fontWeight: 700,
          marginBottom: "16px",
          color: "#1976d2",
        }}
      >
        Gerencie seus Clientes
      </Typography>
      <Typography
        variant={isMobile ? "body1" : "h6"}
        sx={{
          color: "text.secondary",
          maxWidth: "600px",
        }}
      >
        Solução simples e eficiente para gerenciar informações de clientes
      </Typography>
    </Box>
  );
};

// ============================================================
// PREVIEW SECTION
// ============================================================
const PreviewSection = () => {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          padding: { xs: "16px", md: "24px" },
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "400px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
          }}
        >
          <Typography>Área de Preview</Typography>
        </Box>
      </Box>
    </Box>
  );
};

// ============================================================
// CHALLENGES SECTION
// ============================================================
const ChallengeCard = ({ icon, title, description }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          flex: 1,
          gap: "12px",
        }}
      >
        <Box
          sx={{
            fontSize: "48px",
            lineHeight: 1,
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const ChallengesSection = () => {
  const challenges = [
    {
      icon: "👥",
      title: "Gerenciamento Simples",
      description: "Interface intuitiva para gerenciar clientes",
    },
    {
      icon: "📋",
      title: "Organização",
      description: "Mantenha todos os dados organizados",
    },
    {
      icon: "🔍",
      title: "Acesso Rápido",
      description: "Encontre informações rapidamente",
    },
  ];

  return (
    <Box
      component="section"
      id="features"
      sx={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: { xs: "16px", md: "24px" },
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 700,
          marginBottom: "8px",
          textAlign: "center",
          color: "#1976d2",
        }}
      >
        Por que usar FarmaUP?
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          textAlign: "center",
          marginBottom: "32px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        Funcionalidades que facilitam seu dia a dia
      </Typography>

      <Grid container spacing={3}>
        {challenges.map((challenge) => (
          <Grid item xs={12} sm={6} md={4} key={challenge.title}>
            <ChallengeCard {...challenge} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// ============================================================
// WORLDS SECTION (Cards com imagens)
// ============================================================
const WorldCard = ({ title, description, color }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardMedia
        sx={{
          height: "200px",
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize: "64px",
        }}
      />
      <CardContent>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const WorldsSection = () => {
  const worlds = [
    {
      title: "Documentação",
      description: "Acesse toda a documentação da plataforma",
      color: "#1976d2",
    },
    {
      title: "Suporte",
      description: "Entre em contato com nosso suporte",
      color: "#4caf50",
    },
    {
      title: "Comunidade",
      description: "Conecte-se com outros usuários",
      color: "#ff9800",
    },
  ];

  return (
    <Box
      component="section"
      id="worlds"
      sx={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: { xs: "16px", md: "24px" },
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 700,
          marginBottom: "8px",
          textAlign: "center",
          color: "#1976d2",
        }}
      >
        Recursos Adicionais
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          textAlign: "center",
          marginBottom: "32px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        Explore todas as possibilidades da plataforma
      </Typography>

      <Grid container spacing={3}>
        {worlds.map((world) => (
          <Grid item xs={12} sm={6} md={4} key={world.title}>
            <WorldCard {...world} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// ============================================================
// PAGE TEMPLATE COMPONENT
// ============================================================
export default function PageTemplate() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Spacer */}
      <Box sx={{ height: SPACING.spacerMedium }} />

      {/* Preview Section */}
      <PreviewSection />

      {/* Spacer */}
      <Box sx={{ height: SPACING.spacerLarge }} />

      {/* Challenges Section */}
      <ChallengesSection />

      {/* Spacer */}
      <Box sx={{ height: SPACING.spacerXLarge }} />

      {/* Worlds Section */}
      <WorldsSection />

      {/* Spacer */}
      <Box sx={{ height: SPACING.spacerXXLarge }} />
    </Box>
  );
}

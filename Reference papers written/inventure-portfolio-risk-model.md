# InVenture Portfolio Risk Model

## Table of Contents
1. [Introduction and Problem Statement](#1-introduction-and-problem-statement)
2. [The InVenture Model Overview](#2-the-inventure-model-overview)
3. [Mathematical Foundation](#3-mathematical-foundation)
4. [Portfolio Construction Framework](#4-portfolio-construction-framework)
5. [Stage-by-Stage Risk Analysis](#5-stage-by-stage-risk-analysis)
6. [Monte Carlo Simulation Approach](#6-monte-carlo-simulation-approach)
7. [Capital Efficiency and Cash Flow Management](#7-capital-efficiency-and-cash-flow-management)
8. [Sensitivity Analysis Framework](#8-sensitivity-analysis-framework)
9. [Risk Management Strategies](#9-risk-management-strategies)
10. [Key Conclusions](#10-key-conclusions)
11. [Implementation Recommendations](#11-implementation-recommendations)

## 1. Introduction and Problem Statement

Capital-intensive technologies face a critical funding gap when moving from pilot to commercial scale. This "valley of death" exists because:

- **High Capital Requirements:** First-of-a-kind commercial facilities need tens or hundreds of millions in upfront investment
- **Technology Risk:** Unproven technologies create substantial uncertainty for investors
- **Timeline Mismatch:** Venture capital typically seeks returns within 5-10 years, while industrial projects may take 4-6 years just to develop
- **Financing Gap:** Projects are too capital-intensive for conventional venture capital but too risky for traditional project finance

Traditional financing approaches are ill-suited to address this gap:
- Venture capital cannot commit the large sums required
- Project finance requires demonstrated operational performance
- Corporate R&D moves slowly and is risk-averse
- Government grants rarely cover full commercialization costs

## 2. The InVenture Model Overview

The InVenture model creates a pathway to finance capital-intensive technologies by structuring multiple investment rounds that attract different investor types as risk decreases and valuation increases.

### 2.1 Four-Stage Investment Structure

| Stage | Pre-Seed | Seed | Series A | Series B |
|------|---------|------|----------|----------|
| **Focus** | Pre-feasibility | Feasibility | FEED & Development | Construction & Commissioning |
| **Risk Taken** | Technology & Concept | Preliminary Engineering | Detailed Design | Execution & Construction |
| **Investor Type** | Tech VC & Angels | Tech/Climate VC | Growth VC & Strategic | Project Equity |
| **Investment Size** | $500K | $1M | $7.5M | $35M |
| **Return Profile** | 21.9x / 250% IRR | 11.4x / 154% IRR | 4.3x / 23% IRR | 3.3x / 18% IRR |
| **Success Rate** | 20% to next stage | 40% to next stage | 60% to next stage | N/A |

### 2.2 Financial Structure and Valuation Progression

|                   |          |    1    |    2    |    3    |    4    | Distribution | Ownership | MOIC   | IRR   |
|-------------------|----------|---------|---------|---------|---------|--------------|-----------|--------|-------|
|                   |          |         |         |         |         |      %       |    %      |  'x'   |   %   |
| Management        |     -    |         |         |         |         |    7,442     |    10%    |        |       |
| Pre-Seed          |    (500) |    500  |  1,000  |  3,750  |  7,500  |   10,942     |    10%    | 21.88x |  250% |
| Series Seed       |  (1,000) |         |  1,000  |  3,750  |  7,500  |   11,442     |    10%    | 11.44x |  154% |
| Series 'A'        |  (7,500) |         |         |  7,500  | 15,000  |   32,420     |    21%    |  4.32x |   23% |
| Series 'B'        | (35,000) |         |         |         | 35,000  |  114,770     |    48%    |  3.28x |   18% |
|                   |          |         |         |         |         |              |           |        |       |
|                   |          |         |         |         |         |   177,017    |   100%    |  3.9x  |       |
|                   |          |         |         |         |         |              |           |        |       |
| Pre-money         |          |    500  |  1,000  |  7,500  | 30,000  |              |           |        |       |
| New-money         |          |    500  |  1,000  |  7,500  | 35,000  |              |           |        |       |
| Post-money        |          |  1,000  |  2,000  | 15,000  | 65,000  |              |           |  2.72  |       |

## 3. Mathematical Foundation

### 3.1 Probability Space Definition

For each project i, we define a random vector (X₁ᵢ, X₂ᵢ, X₃ᵢ) where:
- X₁ᵢ = 1 if project i advances from Pre-Seed to Seed, 0 otherwise
- X₂ᵢ = 1 if project i advances from Seed to Series A, 0 otherwise
- X₃ᵢ = 1 if project i advances from Series A to Series B, 0 otherwise

The conditional probabilities are:
- P(X₁ᵢ = 1) = 0.20
- P(X₂ᵢ = 1 | X₁ᵢ = 1) = 0.40
- P(X₃ᵢ = 1 | X₁ᵢ = 1, X₂ᵢ = 1) = 0.60

### 3.2 Expected Value Calculation

For each initial project i, the expected value is:

```
E[V(i)] = P(X₁ᵢ=0)×(-I₀) + P(X₁ᵢ=1,X₂ᵢ=0)×(-I₀-I₁) + P(X₁ᵢ=1,X₂ᵢ=1,X₃ᵢ=0)×(-I₀-I₁-I₂) + P(X₁ᵢ=1,X₂ᵢ=1,X₃ᵢ=1)×(R-I₀-I₁-I₂-I₃)
```

Where:
- I₀, I₁, I₂, I₃ are the investments at each stage
- R is the return from successful projects
- P(X₁ᵢ=1,X₂ᵢ=1,X₃ᵢ=1) = 0.20 × 0.40 × 0.60 = 0.048

### 3.3 Binomial Distribution Fundamentals

The probability of exactly k successes from n trials, each with probability p:

```
P(X = k) = (n choose k) × p^k × (1-p)^(n-k)
```

The probability of at least k successes:

```
P(X ≥ k) = Σ[i=k to n] (n choose i) × p^i × (1-p)^(n-i)
```

For large n, we can use the normal approximation:

```
P(X ≥ k) ≈ 1 - Φ((k-0.5-n×p)/√(n×p×(1-p)))
```

Where Φ is the cumulative distribution function of the standard normal distribution.

## 4. Portfolio Construction Framework

### 4.1 Optimal Portfolio Size Determination

To determine the optimal portfolio size with a confidence level α (e.g., 95%):

For a target of k successful Series B companies, we need to find the smallest N₀ such that:
```
P(Bin(N₀, p) ≥ k) ≥ α
```
Where:
- p = 0.048 (compound success probability)
- Bin(N₀, p) is a binomial random variable

For example, to achieve 40 successful Series B companies with 95% confidence:
```
0.95 = 1 - Φ((40-0.5-N₀×0.048)/√(N₀×0.048×0.952))
```

Solving for N₀ yields approximately 876 Pre-Seed investments.

### 4.2 Portfolio Structure and Success Rates

| Funding Stage | Number of Companies | Success Rate | Funding per Company | Total Funding Required | Total in Successful | Payout |
|---------------|---------------------|--------------|---------------------|------------------------|---------------------|--------|
| Pre-Seed      | 876                 | 20%          | $500K               | $438M                  | $20.0M              | $437.9M |
| Seed          | 175.2               | 40%          | $1M                 | $175.2M                | $40.0M              | $457.9M |
| Series A      | 70.1                | 60%          | $7.5M               | $525.8M                | $300.0M             | $1,296.8M |
| Series B      | 42.1                | N/A          | $35M                | $1,473.5M              | $1,473.5M           | $4,590.8M |
| TOTAL         | -                   | -            | -                   | $2,612.5M              | $1,833.5M           | $6,783.0M |

### 4.3 Covariance Structure

Project outcomes may not be truly independent. Potential correlation sources include:
1. Technology risk: Projects using similar technologies may face correlated outcomes
2. Market risk: External market conditions may affect multiple projects simultaneously
3. Policy risk: Regulatory changes may impact multiple projects

We can model this using a correlation coefficient ρ between pairs of projects:

```
Var(∑X_i) = ∑Var(X_i) + ∑∑Cov(X_i,X_j) = N×σ² + N×(N-1)×ρ×σ²
```

For the full portfolio with correlation coefficient ρ:
```
Portfolio Variance = N×p×(1-p)×(1 + (N-1)×ρ)
```

## 5. Stage-by-Stage Risk Analysis

### 5.1 Pre-Seed Stage (Stage 0)

Investment per project: $500K
Number of projects: N₀ = 876 (for 95% confidence)
Total investment: $438M

The number of successful projects follows Bin(876, 0.20):
- Expected number: 175.2
- Standard deviation: √(876 × 0.20 × 0.80) = 11.8
- 95% confidence interval: [152, 199]

For the Pre-Seed investor, the return profile is:
- 80% of investments ($350.4M) generate no return
- 20% of investments ($87.6M) potentially generate the full 21.88x return

The expected multiple is:
```
0.80 × 0 + 0.20 × 21.88 = 4.38x
```

### 5.2 Seed Stage (Stage 1)

Expected number of projects: 175.2
Investment per project: $1M
Total new investment: $175.2M

The number of projects advancing to Series A follows Bin(175.2, 0.40):
- Expected number: 70.1
- Standard deviation: √(175.2 × 0.40 × 0.60) = 6.5
- 95% confidence interval: [57, 83]

For the Seed investor, the return profile is:
- 60% of investments ($105.1M) generate no return
- 40% of investments ($70.1M) potentially generate the full 11.44x return

The expected multiple is:
```
0.60 × 0 + 0.40 × 11.44 = 4.58x
```

### 5.3 Series A Stage (Stage 2)

Expected number of projects: 70.1
Investment per project: $7.5M
Total new investment: $525.8M

The number of projects advancing to Series B follows Bin(70.1, 0.60):
- Expected number: 42.1
- Standard deviation: √(70.1 × 0.60 × 0.40) = 4.1
- 95% confidence interval: [34, 50]

For the Series A investor, the return profile is:
- 40% of investments ($210.3M) generate no return
- 60% of investments ($315.5M) potentially generate the full 4.32x return

The expected multiple is:
```
0.40 × 0 + 0.60 × 4.32 = 2.59x
```

### 5.4 Series B Stage (Stage 3)

Expected number of projects: 42.1
Investment per project: $35M
Total new investment: $1,473.5M

For the Series B investor, all projects are expected to generate the 3.28x return.

The expected multiple is:
```
1.00 × 3.28 = 3.28x
```

## 6. Monte Carlo Simulation Approach

```python
# Parameters
num_simulations = 10000
num_pre_seed = 876
pre_seed_success_rate = 0.20
seed_success_rate = 0.40
series_a_success_rate = 0.60

pre_seed_investment = 0.5  # $500K
seed_investment = 1.0  # $1M
series_a_investment = 7.5  # $7.5M
series_b_investment = 35.0  # $35M

pre_seed_return = 21.88
seed_return = 11.44
series_a_return = 4.32
series_b_return = 3.28

correlation = 0.05  # Assumed correlation between project outcomes

# Initialize arrays to store results
final_successful_counts = np.zeros(num_simulations)
total_investments = np.zeros(num_simulations)
total_returns = np.zeros(num_simulations)
final_multiples = np.zeros(num_simulations)

# Run simulations
for sim in range(num_simulations):
    # Generate correlated random variables for Pre-Seed outcomes
    # This is a simplified approach - actual implementation would use Gaussian copulas
    # or other correlation structures to generate correlated binary outcomes
    uniform_rvs = np.random.uniform(0, 1, num_pre_seed)
    
    # Convert to binary outcomes based on success rate
    pre_seed_outcomes = (uniform_rvs < pre_seed_success_rate).astype(int)
    num_seed = np.sum(pre_seed_outcomes)
    
    # Generate Seed outcomes
    seed_outcomes = np.random.binomial(1, seed_success_rate, num_seed)
    num_series_a = np.sum(seed_outcomes)
    
    # Generate Series A outcomes
    series_a_outcomes = np.random.binomial(1, series_a_success_rate, num_series_a)
    num_series_b = np.sum(series_a_outcomes)
    
    # Calculate investments
    pre_seed_total = num_pre_seed * pre_seed_investment
    seed_total = num_seed * seed_investment
    series_a_total = num_series_a * series_a_investment
    series_b_total = num_series_b * series_b_investment
    
    total_investment = pre_seed_total + seed_total + series_a_total + series_b_total
    
    # Calculate returns
    # Each successful Series B company generates a return
    total_return = num_series_b * series_b_investment * series_b_return
    
    # Store results
    final_successful_counts[sim] = num_series_b
    total_investments[sim] = total_investment
    total_returns[sim] = total_return
    final_multiples[sim] = total_return / total_investment if total_investment > 0 else 0

# Calculate statistics
mean_successful = np.mean(final_successful_counts)
std_successful = np.std(final_successful_counts)
mean_investment = np.mean(total_investments)
mean_return = np.mean(total_returns)
mean_multiple = np.mean(final_multiples)
std_multiple = np.std(final_multiples)

# Calculate confidence intervals
success_ci = np.percentile(final_successful_counts, [5, 95])
return_ci = np.percentile(total_returns, [5, 95])
multiple_ci = np.percentile(final_multiples, [5, 95])

# Calculate probability of achieving target
prob_achieving_target = np.mean(final_successful_counts >= 40)

# Calculate Value at Risk (VaR) at 95% confidence
portfolio_returns = total_returns - total_investments
var_95 = np.percentile(portfolio_returns, 5)

# Calculate Conditional Value at Risk (CVaR)
cvar_95 = np.mean(portfolio_returns[portfolio_returns <= var_95])
```

## 7. Capital Efficiency and Cash Flow Management

The model should also consider the timing of investments and returns, which affects IRR:

```python
# Define a timeline in quarters
quarters = 40  # 10 years

# Assumptions about timing
pre_seed_duration = 4   # quarters
seed_duration = 4       # quarters
series_a_duration = 8   # quarters
series_b_duration = 6   # quarters
operating_duration = 40 # quarters

# Initialize cash flow array
cash_flows = np.zeros(quarters)

# For each successful project, model the cash flows
for i in range(int(mean_successful)):
    # Investment cash flows (negative)
    cash_flows[0] -= pre_seed_investment
    cash_flows[pre_seed_duration] -= seed_investment
    cash_flows[pre_seed_duration + seed_duration] -= series_a_investment
    cash_flows[pre_seed_duration + seed_duration + series_a_duration] -= series_b_investment
    
    # Return cash flows (positive)
    operation_start = pre_seed_duration + seed_duration + series_a_duration + series_b_duration
    for q in range(operation_start, min(quarters, operation_start + operating_duration)):
        cash_flows[q] += (series_b_investment * series_b_return) / operating_duration

# Calculate IRR
def npv(rate, cash_flows):
    return sum(cf / (1 + rate)**(i/4) for i, cf in enumerate(cash_flows))

def irr(cash_flows, guess=0.1):
    from scipy.optimize import newton
    return newton(lambda r: npv(r, cash_flows), guess)

portfolio_irr = irr(cash_flows)
```

## 8. Sensitivity Analysis Framework

```python
# Parameters to vary
parameters = {
    'pre_seed_success_rate': [0.15, 0.20, 0.25],
    'seed_success_rate': [0.30, 0.40, 0.50],
    'series_a_success_rate': [0.50, 0.60, 0.70],
    'correlation': [0.00, 0.05, 0.10],
    'pre_seed_return': [18.00, 21.88, 25.00],
    'seed_return': [9.00, 11.44, 14.00],
    'series_a_return': [3.50, 4.32, 5.00],
    'series_b_return': [2.80, 3.28, 3.80]
}

# Output metrics to track
metrics = ['mean_successful', 'prob_achieving_target', 'mean_multiple', 'portfolio_irr', 'var_95']

# Initialize results dataframe
sensitivity_results = pd.DataFrame()

# For each parameter, vary it while keeping others at base values
for param, values in parameters.items():
    for value in values:
        # Create a parameters dictionary with the base values
        current_params = {
            'pre_seed_success_rate': 0.20,
            'seed_success_rate': 0.40,
            'series_a_success_rate': 0.60,
            'correlation': 0.05,
            'pre_seed_return': 21.88,
            'seed_return': 11.44,
            'series_a_return': 4.32,
            'series_b_return': 3.28
        }
        
        # Update the parameter being varied
        current_params[param] = value
        
        # Run the simulation with these parameters
        # [Monte Carlo simulation code here, using current_params]
        
        # Store the results
        result = {
            'parameter': param,
            'value': value,
            'mean_successful': mean_successful,
            'prob_achieving_target': prob_achieving_target,
            'mean_multiple': mean_multiple,
            'portfolio_irr': portfolio_irr,
            'var_95': var_95
        }
        
        sensitivity_results = sensitivity_results.append(result, ignore_index=True)
```

## 9. Risk Management Strategies

### 9.1 Staged Capital Deployment

Instead of committing all capital upfront, deploy capital contingent on achieving milestone success rates:

```python
# Initial commitment: enough for Pre-Seed plus some buffer
initial_commitment = pre_seed_total * 1.2

# Trigger for additional capital commitment
if observed_pre_seed_success_rate >= 0.18:  # Slightly below expected
    # Commit Seed capital
    seed_commitment = seed_total * 1.1
else:
    # Reduce Seed commitment or rebalance portfolio
    seed_commitment = seed_total * 0.8
```

### 9.2 Portfolio Rebalancing

Periodically evaluate whether the portfolio is on track and adjust if necessary:

```python
# If success rates are below expectations
if observed_pre_seed_success_rate < 0.18:
    # Add more Pre-Seed investments to compensate
    additional_pre_seed = math.ceil((0.20 - observed_pre_seed_success_rate) * num_pre_seed / observed_pre_seed_success_rate)
```

### 9.3 Hedging Strategies

For investors concerned about specific risks (e.g., policy risk), hedging instruments could be developed:

```python
# Example: Policy risk hedge
policy_risk_hedge_cost = total_investment * 0.02  # 2% of total investment
policy_risk_hedge_payout = total_investment * 0.30  # Covers 30% of potential losses

# Adjust expected returns
adjusted_expected_return = expected_return - policy_risk_hedge_cost
```

## 10. Key Conclusions

### 10.1 Statistical Power Through Portfolio Diversification

The model demonstrates that while individual capital-intensive projects have high failure rates (only 4.8% make it from Pre-Seed to successful Series B), a properly sized portfolio transforms this uncertainty into statistical predictability. With approximately 833-876 Pre-Seed investments, we can achieve 95% confidence of reaching our target of 40 successful commercial projects.

### 10.2 Stage-Appropriate Risk-Return Profiles

The model validates that each investment stage offers risk-adjusted returns appropriate for different investor types:
- Pre-Seed investors (20% success rate): 21.88x return potential (expected multiple: 4.38x)
- Seed investors (40% success rate): 11.44x return potential (expected multiple: 4.58x)
- Series A investors (60% success rate): 4.32x return potential (expected multiple: 2.59x)
- Series B investors (100% success rate): 3.28x return potential (expected multiple: 3.28x)

This staged de-risking creates a natural handoff between venture capital, growth equity, and infrastructure investors as the risk profile evolves.

### 10.3 Capital Efficiency Optimization

The funnel approach ensures that capital is deployed efficiently, with approximately 71% of total investment flowing to ultimately successful projects. This is dramatically more efficient than traditional venture approaches where often less than 20% of capital reaches successful outcomes.

### 10.4 Critical Sensitivities and Vulnerabilities

The model reveals that overall portfolio performance is most sensitive to:
1. Success rates at each stage (especially early stages)
2. Correlation between project outcomes
3. Return multiples for successful projects

### 10.5 Risk Management Imperatives

Effective implementation requires:
- Regular monitoring of actual success rates compared to projections
- Dynamic portfolio rebalancing if observed rates differ from expectations
- Contingency planning for below-target performance
- Staged capital commitments tied to milestone achievements
- Diversification across uncorrelated technology types

### 10.6 Scale Requirements and Institutional Implications

The approach requires significant scale to work effectively:
- Total capital required: ~$2.6 billion across all stages
- Organizational capacity to evaluate and manage hundreds of early-stage opportunities
- Long time horizons (10+ years) for full portfolio maturation

This suggests the model is best suited for large institutional investors, sovereign wealth funds, or dedicated investment platforms with patient capital.

### 10.7 Transformative Potential for Capital-Intensive Innovation

The model potentially solves one of the most persistent problems in industrial innovation financing by:
- Creating a viable pathway from laboratory to commercial scale
- Generating appropriate returns for different investor types
- Enabling technological solutions that would otherwise struggle to cross the "valley of death"
- Applying portfolio theory to make "long-shot" technologies investable at scale

## 11. Implementation Recommendations

### 11.1 Organizational Structure

To implement the InVenture portfolio approach, we recommend the creation of a dedicated investment platform with:

1. **Specialized Investment Teams for Each Stage:**
   - Pre-Seed/Seed: Technology experts with venture background
   - Series A: Hybrid teams with both technology and project development expertise
   - Series B: Project finance and execution specialists

2. **Centralized Due Diligence Resources:**
   - Technical assessment team
   - Market assessment team
   - Engineering and cost estimation team
   - Environmental and regulatory team

3. **Portfolio Management Function:**
   - Track success rates across stages
   - Rebalance portfolio as needed
   - Optimize capital deployment

### 11.2 Capital Structure

The capital structure should reflect the risk-return profile of each stage:

1. **Pre-Seed/Seed Fund:** Venture-style structure with higher risk tolerance
2. **Series A Fund:** Growth equity structure with moderate risk tolerance
3. **Series B Fund:** Infrastructure-style structure with lower risk tolerance but longer time horizons

### 11.3 Technology Selection Criteria

Key criteria for initial technology selection should include:

1. **Scalability:** Technologies that can benefit from learning curves and scale economies
2. **Market Size:** Sufficient addressable market to support multiple successful projects
3. **Differentiation:** Clear advantages over incumbent technologies
4. **Team Capability:** Strong technical and commercial leadership
5. **Development Path:** Clear, measurable milestones for stage progression

### 11.4 Partner Ecosystem Development

Creating a strong ecosystem of partners will enhance success rates:

1. **Strategic Industrial Partners:** Provide market validation and potential customers
2. **Engineering and Construction Partners:** Support cost estimation and execution
3. **Research Institutions:** Supply technological innovations and expertise
4. **Government Agencies:** Provide complementary funding and policy support
5. **Financial Institutions:** Offer complementary financing structures

### 11.5 Phased Implementation

A phased implementation approach could look like:

1. **Phase 1 (Years 1-2):** Focus on Pre-Seed investments (~150-200 projects)
2. **Phase 2 (Years 2-3):** Add Seed investments for successful Phase 1 projects
3. **Phase 3 (Years 3-4):** Add Series A investments and begin evaluating success rates
4. **Phase 4 (Years 4-5):** Add Series B investments and refine portfolio strategy
5. **Phase 5 (Years 5+):** Scale up based on observed success rates

This phased approach allows for learning and adjustment before full capital deployment.
